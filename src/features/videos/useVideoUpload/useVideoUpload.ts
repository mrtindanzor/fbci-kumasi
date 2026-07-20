import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react"
import { useVideoService } from "../videos.useVideoService"
import type { UseVideoUpload, VideoUploadConfig } from "./useVideoUpload.types"
import { videoUploadReducer } from "./useVideoUploadState"
import { chunkFile } from "./utils/chunkFile"
import { createSpeedTracker } from "./utils/computeSpeed"
import { createUploadQueue } from "./utils/uploadQueue"
import { checkVideoRules } from "./utils/videoRules"

const DEFAULT_CONFIG: Required<VideoUploadConfig> = {
  chunkSizeMB: 10,
  concurrency: 3,
  acceptedTypes: [
    "video/mp4",
    "video/webm",
    "video/ogg",
    "video/quicktime",
    "video/x-msvideo",
    "video/x-matroska",
  ],
  maxFileSizeMB: 500,
}

export function useVideoUpload(config?: VideoUploadConfig): UseVideoUpload {
  const videoService = useVideoService()
  const resolvedConfig = useMemo(
    () => ({ ...DEFAULT_CONFIG, ...config }),
    [config],
  )

  const [uploads, dispatch] = useReducer(videoUploadReducer, [])
  const queuesRef = useRef(
    new Map<string, ReturnType<typeof createUploadQueue>>(),
  )
  const speedTrackersRef = useRef(
    new Map<string, ReturnType<typeof createSpeedTracker>>(),
  )
  const [, forceUpdate] = useState(0)

  const triggerUpdate = useCallback(() => forceUpdate((n) => n + 1), [])

  const select = useCallback(
    (files: File[]) => {
      const validFiles: File[] = []
      for (const file of files) {
        const result = checkVideoRules(file, resolvedConfig)
        if (result.valid) {
          validFiles.push(file)
        }
      }
      if (validFiles.length > 0) {
        dispatch({ type: "SELECT", files: validFiles })
      }
    },
    [resolvedConfig],
  )

  const remove = useCallback((id: string) => {
    const queue = queuesRef.current.get(id)
    if (queue) {
      queue.cancel()
      queuesRef.current.delete(id)
    }
    speedTrackersRef.current.delete(id)
    dispatch({ type: "REMOVE", id })
  }, [])

  const clear = useCallback(() => {
    for (const [, queue] of queuesRef.current) {
      queue.cancel()
    }
    queuesRef.current.clear()
    speedTrackersRef.current.clear()
    dispatch({ type: "CLEAR" })
  }, [])

  const completeUpload = useCallback(
    async (id: string, uploadId: string, key: string) => {
      const queue = queuesRef.current.get(id)
      if (!queue) return

      dispatch({ type: "COMPLETING", id })
      triggerUpdate()

      try {
        const etags = queue.getCompletedEtags()
        const parts = Object.entries(etags)
          .map(([partNumber, etag]) => ({
            partNumber: Number(partNumber),
            etag,
          }))
          .sort((a, b) => a.partNumber - b.partNumber)

        const result = await videoService.completeUpload({
          uploadId,
          key,
          parts,
        })

        dispatch({ type: "COMPLETED", id, url: result.url })
      } catch (error) {
        const reason =
          error instanceof Error ? error.message : "Failed to complete upload"
        dispatch({
          type: "FAILED",
          id,
          reason,
          failedPartNumber: null,
        })
      } finally {
        queuesRef.current.delete(id)
        speedTrackersRef.current.delete(id)
        triggerUpdate()
      }
    },
    [videoService, triggerUpdate],
  )

  const start = useCallback(
    async (id: string) => {
      const current = uploads.find((u) => u.id === id)
      if (current?.status !== "idle") return

      dispatch({ type: "PREPARE", id })

      try {
        const chunks = chunkFile(current.file, resolvedConfig.chunkSizeMB)

        const session = await videoService.createUploadSession({
          fileName: current.name,
          fileSize: current.size,
          fileType: current.type,
          totalParts: chunks.length,
        })

        dispatch({
          type: "SESSION_CREATED",
          id,
          uploadId: session.uploadId,
          key: session.key,
        })

        const existingEtags: Record<number, string> = {}
        try {
          const uploadedParts = await videoService.getUploadedParts({
            uploadId: session.uploadId,
            key: session.key,
          })
          for (const part of uploadedParts) {
            existingEtags[part.partNumber] = part.etag
          }
        } catch {
          // no previously uploaded parts
        }

        dispatch({ type: "START_UPLOAD", id, chunks })

        const speedTracker = createSpeedTracker()
        speedTrackersRef.current.set(id, speedTracker)

        const queue = createUploadQueue({
          file: current.file,
          chunks,
          uploadId: session.uploadId,
          key: session.key,
          concurrency: resolvedConfig.concurrency,
          existingEtags,
          videoService,
          callbacks: {
            onPartProgress(partNumber, loaded, total) {
              speedTracker.addSample(
                computeBytesUploadedFromProgress(
                  chunks,
                  partNumber,
                  loaded,
                  total,
                ),
              )
              dispatch({
                type: "PART_PROGRESS",
                id,
                partNumber,
                loaded,
                total,
              })
              triggerUpdate()
            },
            onPartCompleted(partNumber, etag) {
              dispatch({
                type: "PART_COMPLETED",
                id,
                partNumber,
                etag,
              })
              triggerUpdate()
            },
            onPartFailed(partNumber) {
              dispatch({
                type: "PART_FAILED",
                id,
                partNumber,
              })
              triggerUpdate()
            },
            onAllCompleted() {
              completeUpload(id, session.uploadId, session.key)
            },
            onError(reason, failedPartNumber) {
              dispatch({
                type: "FAILED",
                id,
                reason,
                failedPartNumber,
              })
              queuesRef.current.delete(id)
              speedTrackersRef.current.delete(id)
              triggerUpdate()
            },
          },
        })

        queuesRef.current.set(id, queue)
        queue.start()
      } catch (error) {
        const reason =
          error instanceof Error ? error.message : "Failed to start upload"
        dispatch({
          type: "FAILED",
          id,
          reason,
          failedPartNumber: null,
        })
      }
    },
    [uploads, videoService, resolvedConfig, triggerUpdate, completeUpload],
  )

  const pause = useCallback(
    (id: string) => {
      const queue = queuesRef.current.get(id)
      if (!queue) return
      queue.pause()
      dispatch({ type: "PAUSE", id })
      triggerUpdate()
    },
    [triggerUpdate],
  )

  const resume = useCallback(
    (id: string) => {
      const queue = queuesRef.current.get(id)
      if (!queue) return
      queue.resume()
      dispatch({ type: "RESUME", id })
      triggerUpdate()
    },
    [triggerUpdate],
  )

  const retry = useCallback(
    (id: string) => {
      const current = uploads.find((u) => u.id === id)
      if (current?.status !== "failed") return

      dispatch({ type: "RETRY", id })

      const queue = queuesRef.current.get(id)
      if (queue) {
        queue.retry()
      }
      triggerUpdate()
    },
    [uploads, triggerUpdate],
  )

  const cancel = useCallback(
    (id: string) => {
      const queue = queuesRef.current.get(id)
      if (queue) {
        queue.cancel()
        queuesRef.current.delete(id)
      }
      speedTrackersRef.current.delete(id)

      const current = uploads.find((u) => u.id === id)
      if (current && "uploadId" in current && current.uploadId && current.key) {
        videoService
          .abortUpload({
            uploadId: current.uploadId,
            key: current.key,
          })
          .catch(() => {})
      }

      dispatch({ type: "CANCEL", id })
      triggerUpdate()
    },
    [uploads, videoService, triggerUpdate],
  )

  const getById = useCallback(
    (id: string) => uploads.find((u) => u.id === id),
    [uploads],
  )

  const getAll = useCallback(() => uploads, [uploads])

  const isUploading = uploads.some(
    (u) =>
      u.status === "uploading" ||
      u.status === "preparing" ||
      u.status === "completing",
  )

  useEffect(() => {
    return () => {
      for (const [, queue] of queuesRef.current) {
        queue.cancel()
      }
      queuesRef.current.clear()
      speedTrackersRef.current.clear()
    }
  }, [])

  return {
    select,
    remove,
    clear,
    start,
    pause,
    resume,
    retry,
    cancel,
    getById,
    getAll,
    isUploading,
  }
}

function computeBytesUploadedFromProgress(
  chunks: Array<{ partNumber: number; size: number }>,
  partNumber: number,
  loaded: number,
  total: number,
): number {
  let bytes = 0
  for (const chunk of chunks) {
    if (chunk.partNumber === partNumber) {
      bytes += total > 0 ? Math.floor(chunk.size * (loaded / total)) : 0
    } else {
      bytes += chunk.size
    }
  }
  return bytes
}
