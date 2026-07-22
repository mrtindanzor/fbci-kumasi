import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react"
import type {
  VideoUploadResult,
  VideoUploadState,
} from "../videos.contracts.types"
import { useVideoService } from "../videos.useVideoService"
import type { UseVideoUpload, VideoUploadConfig } from "./useVideoUpload.types"
import { videoUploadReducer } from "./useVideoUploadState"
import { chunkFile } from "./utils/chunkFile"
import { createSpeedTracker } from "./utils/computeSpeed"
import { createUploadQueue } from "./utils/uploadQueue"
import { checkVideoRules } from "./utils/videoRules"

const DEFAULT_CONFIG: Required<
  Omit<VideoUploadConfig, "video" | "deferDelete">
> & {
  video?: { url: string }
} = {
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

  const [state, dispatch] = useReducer(
    videoUploadReducer,
    null,
    (): VideoUploadState | null => {
      if (config?.video?.url) {
        return {
          status: "completed",
          id: "existing-video",
          file: new File([], ""),
          name: config.video.url,
          size: 0,
          type: "",
          uploadId: "",
          key: "",
          url: config.video.url,
          completedAt: Date.now(),
        }
      }
      return null
    },
  )

  const queuesRef = useRef(
    new Map<string, ReturnType<typeof createUploadQueue>>(),
  )
  const speedTrackersRef = useRef(
    new Map<string, ReturnType<typeof createSpeedTracker>>(),
  )
  const pendingDeletionRef = useRef<string | null>(null)
  const [, forceUpdate] = useState(0)

  const triggerUpdate = useCallback(() => forceUpdate((n) => n + 1), [])

  const select = useCallback(
    (files: File[]) => {
      if (state && state.status !== "error") return

      const file = files[0]
      if (!file) return

      const result = checkVideoRules(file, resolvedConfig)
      if (!result.valid) {
        dispatch({ type: "SELECT_ERROR", reason: result.reason })
        return
      }

      dispatch({ type: "SELECT", file })
    },
    [state, resolvedConfig],
  )

  const uploadAll = useCallback(async (): Promise<VideoUploadResult | null> => {
    if (state?.status === "completed" && "url" in state) {
      return {
        url: state.url,
        name: state.name,
        size: state.size,
        type: state.type,
      }
    }

    if (state?.status !== "idle") return null

    dispatch({ type: "PREPARE" })

    try {
      const chunks = chunkFile(state.file, resolvedConfig.chunkSizeMB)

      const session = await videoService.createUploadSession({
        fileName: state.name,
        fileSize: state.size,
        fileType: state.type,
        totalParts: chunks.length,
      })

      dispatch({
        type: "SESSION_CREATED",
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

      dispatch({ type: "START_UPLOAD", chunks })

      const speedTracker = createSpeedTracker()
      speedTrackersRef.current.set(state.id, speedTracker)

      const url = await new Promise<string>((resolve, reject) => {
        const queue = createUploadQueue({
          file: state.file,
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
                partNumber,
                loaded,
                total,
              })
              triggerUpdate()
            },
            onPartCompleted(partNumber, etag) {
              dispatch({ type: "PART_COMPLETED", partNumber, etag })
              triggerUpdate()
            },
            onPartFailed(partNumber) {
              dispatch({ type: "PART_FAILED", partNumber })
              triggerUpdate()
            },
            onAllCompleted() {
              dispatch({ type: "COMPLETING" })
              triggerUpdate()
              videoService
                .completeUpload({
                  uploadId: session.uploadId,
                  key: session.key,
                  parts: Object.entries(queue.getCompletedEtags())
                    .map(([partNumber, etag]) => ({
                      partNumber: Number(partNumber),
                      etag,
                    }))
                    .sort((a, b) => a.partNumber - b.partNumber),
                })
                .then((result) => {
                  dispatch({ type: "COMPLETED", url: result.url })
                  resolve(result.url)
                })
                .catch((error) => {
                  const reason =
                    error instanceof Error
                      ? error.message
                      : "Failed to complete upload"
                  dispatch({ type: "FAILED", reason, failedPartNumber: null })
                  reject(new Error(reason))
                })
                .finally(() => {
                  queuesRef.current.delete(state.id)
                  speedTrackersRef.current.delete(state.id)
                  triggerUpdate()
                })
            },
            onError(reason, failedPartNumber) {
              dispatch({ type: "FAILED", reason, failedPartNumber })
              queuesRef.current.delete(state.id)
              speedTrackersRef.current.delete(state.id)
              triggerUpdate()
              reject(new Error(reason))
            },
          },
        })
        queuesRef.current.set(state.id, queue)
        queue.start()
      })

      return { url, name: state.name, size: state.size, type: state.type }
    } catch (error) {
      const reason =
        error instanceof Error ? error.message : "Failed to start upload"
      dispatch({ type: "FAILED", reason, failedPartNumber: null })
      return null
    }
  }, [state, videoService, resolvedConfig, triggerUpdate])

  const preview = useCallback((): VideoUploadState | null => state, [state])

  const remove = useCallback(() => {
    if (!state) return

    if (state.status === "error") {
      dispatch({ type: "REMOVE" })
      return
    }

    if (state.status === "completed" && "url" in state && state.url) {
      if (resolvedConfig.deferDelete) {
        pendingDeletionRef.current = state.url
      } else {
        videoService.deleteVideo(state.url).catch(() => {})
      }
    }

    if (state.status !== "completed") {
      const queue = queuesRef.current.get(state.id)
      if (queue) {
        queue.cancel()
        queuesRef.current.delete(state.id)
      }
      speedTrackersRef.current.delete(state.id)

      if ("uploadId" in state && state.uploadId && state.key) {
        videoService
          .abortUpload({ uploadId: state.uploadId, key: state.key })
          .catch(() => {})
      }
    }

    dispatch({ type: "REMOVE" })
  }, [state, videoService, resolvedConfig])

  const resetAll = useCallback(() => {
    for (const [, queue] of queuesRef.current) {
      queue.cancel()
    }
    queuesRef.current.clear()
    speedTrackersRef.current.clear()
    dispatch({ type: "CLEAR" })
  }, [])

  const deleteVideo = useCallback(async () => {
    const url = pendingDeletionRef.current
    if (!url) return

    pendingDeletionRef.current = null
    await videoService.deleteVideo(url)
  }, [videoService])

  const pause = useCallback(() => {
    if (state?.status !== "uploading") return

    const queue = queuesRef.current.get(state.id)
    if (!queue) return

    queue.pause()
    dispatch({ type: "PAUSE" })
    triggerUpdate()
  }, [state, triggerUpdate])

  const resume = useCallback(() => {
    if (state?.status !== "paused") return

    const queue = queuesRef.current.get(state.id)
    if (!queue) return

    queue.resume()
    dispatch({ type: "RESUME" })
    triggerUpdate()
  }, [state, triggerUpdate])

  const retry = useCallback(() => {
    if (state?.status !== "failed") return

    dispatch({ type: "RETRY" })

    const queue = queuesRef.current.get(state.id)
    if (queue) {
      queue.retry()
    }
    triggerUpdate()
  }, [state, triggerUpdate])

  const cancel = useCallback(() => {
    if (!state || state.status === "error") return

    const queue = queuesRef.current.get(state.id)
    if (queue) {
      queue.cancel()
      queuesRef.current.delete(state.id)
    }
    speedTrackersRef.current.delete(state.id)

    if ("uploadId" in state && state.uploadId && state.key) {
      videoService
        .abortUpload({ uploadId: state.uploadId, key: state.key })
        .catch(() => {})
    }

    dispatch({ type: "CANCEL" })
    triggerUpdate()
  }, [state, videoService, triggerUpdate])

  const isUploading =
    state?.status === "uploading" ||
    state?.status === "preparing" ||
    state?.status === "completing"

  useEffect(() => {
    return () => {
      for (const [, queue] of queuesRef.current) {
        queue.cancel()
      }
      queuesRef.current.clear()
      speedTrackersRef.current.clear()
      pendingDeletionRef.current = null
    }
  }, [])

  return {
    select,
    uploadAll,
    preview,
    remove,
    resetAll,
    deleteVideo,
    pause,
    resume,
    retry,
    cancel,
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
