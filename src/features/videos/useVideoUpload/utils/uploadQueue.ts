import axios, { AxiosError } from "axios"
import type { IVideoService, PartChunk } from "../../videos.contracts.types"

type UploadQueueCallbacks = {
  onPartProgress: (partNumber: number, loaded: number, total: number) => void
  onPartCompleted: (partNumber: number, etag: string) => void
  onPartFailed: (partNumber: number) => void
  onAllCompleted: () => void
  onError: (reason: string, failedPartNumber: number | null) => void
}

type UploadQueueOptions = {
  file: File
  chunks: PartChunk[]
  uploadId: string
  key: string
  concurrency: number
  existingEtags?: Record<number, string>
  videoService: IVideoService
  callbacks: UploadQueueCallbacks
}

export function createUploadQueue(options: UploadQueueOptions) {
  const {
    file,
    chunks,
    uploadId,
    key,
    concurrency,
    existingEtags = {},
    videoService,
    callbacks,
  } = options

  const abortControllers = new Map<number, AbortController>()
  let paused = false
  let cancelled = false
  let activeCount = 0
  let queueIndex = 0

  const completedParts = new Map<number, string>(
    Object.entries(existingEtags).map(([k, v]) => [Number(k), v]),
  )

  function processQueue() {
    if (paused || cancelled) return

    while (activeCount < concurrency && queueIndex < chunks.length) {
      const chunk = chunks[queueIndex++]
      if (!chunk || completedParts.has(chunk.partNumber)) continue

      uploadPart(chunk)
    }

    if (activeCount === 0 && completedParts.size === chunks.length) {
      callbacks.onAllCompleted()
    }
  }

  async function uploadPart(chunk: PartChunk) {
    activeCount++
    const controller = new AbortController()
    abortControllers.set(chunk.partNumber, controller)

    try {
      const slice = file.slice(chunk.start, chunk.end)

      const existingEtag = existingEtags[chunk.partNumber]
      if (existingEtag) {
        completedParts.set(chunk.partNumber, existingEtag)
        callbacks.onPartCompleted(chunk.partNumber, existingEtag)
        activeCount--
        abortControllers.delete(chunk.partNumber)
        processQueue()
        return
      }

      const presigned = await videoService.getPresignedUrls({
        uploadId,
        key,
        parts: [{ partNumber: chunk.partNumber, size: chunk.size }],
      })

      if (controller.signal.aborted || paused || cancelled) {
        activeCount--
        abortControllers.delete(chunk.partNumber)
        return
      }

      const firstPresigned = presigned[0]
      if (!firstPresigned) {
        throw new Error(
          `No presigned URL returned for part ${chunk.partNumber}`,
        )
      }

      const { uploadUrl } = firstPresigned
      const etag = await uploadPartToUrl(
        uploadUrl,
        slice,
        chunk.partNumber,
        callbacks.onPartProgress,
        controller.signal,
      )

      if (controller.signal.aborted || paused || cancelled) {
        activeCount--
        abortControllers.delete(chunk.partNumber)
        return
      }

      completedParts.set(chunk.partNumber, etag)
      callbacks.onPartCompleted(chunk.partNumber, etag)
    } catch (error) {
      if (controller.signal.aborted || paused || cancelled) {
        activeCount--
        abortControllers.delete(chunk.partNumber)
        return
      }

      const reason = error instanceof Error ? error.message : "Upload failed"
      callbacks.onPartFailed(chunk.partNumber)
      callbacks.onError(reason, chunk.partNumber)
    } finally {
      activeCount--
      abortControllers.delete(chunk.partNumber)
      processQueue()
    }
  }

  return {
    start() {
      paused = false
      cancelled = false
      queueIndex = 0
      processQueue()
    },

    pause() {
      paused = true
      for (const [, controller] of abortControllers) {
        controller.abort()
      }
    },

    resume() {
      paused = false
      queueIndex = 0
      processQueue()
    },

    cancel() {
      cancelled = true
      for (const [, controller] of abortControllers) {
        controller.abort()
      }
      abortControllers.clear()
    },

    retry() {
      paused = false
      cancelled = false
      queueIndex = 0
      processQueue()
    },

    getCompletedEtags(): Record<number, string> {
      return Object.fromEntries(completedParts)
    },
  }
}

async function uploadPartToUrl(
  url: string,
  slice: Blob,
  partNumber: number,
  onProgress: (partNumber: number, loaded: number, total: number) => void,
  signal: AbortSignal,
): Promise<string> {
  try {
    const response = await axios.put(url, slice, {
      signal,
      onUploadProgress: (e) => {
        if (e.lengthComputable) {
          onProgress(partNumber, e.loaded, e?.total || slice.size)
        }
      },
    })

    return response.headers.ETag ?? response.headers.etag ?? `"${partNumber}"`
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.code === "ERR_CANCELED")
        throw new DOMException("Upload aborted", "AbortError")

      throw new Error(
        `Part ${partNumber} upload failed with status ${error.status}`,
      )
    }

    throw new Error(`Part ${partNumber} upload failed to upload`)
  }
}
