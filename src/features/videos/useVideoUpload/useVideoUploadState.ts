import type { PartChunk, VideoUploadState } from "../videos.contracts.types"

export type VideoUploadAction =
  | { type: "SELECT"; files: File[] }
  | { type: "REMOVE"; id: string }
  | { type: "CLEAR" }
  | { type: "PREPARE"; id: string }
  | { type: "SESSION_CREATED"; id: string; uploadId: string; key: string }
  | { type: "START_UPLOAD"; id: string; chunks: PartChunk[] }
  | {
      type: "PART_PROGRESS"
      id: string
      partNumber: number
      loaded: number
      total: number
    }
  | {
      type: "PART_COMPLETED"
      id: string
      partNumber: number
      etag: string
    }
  | {
      type: "PART_FAILED"
      id: string
      partNumber: number
    }
  | { type: "PAUSE"; id: string }
  | { type: "RESUME"; id: string }
  | { type: "COMPLETING"; id: string }
  | { type: "COMPLETED"; id: string; url: string }
  | {
      type: "FAILED"
      id: string
      reason: string
      failedPartNumber: number | null
    }
  | { type: "CANCEL"; id: string }
  | { type: "RETRY"; id: string }

export function videoUploadReducer(
  state: VideoUploadState[],
  action: VideoUploadAction,
): VideoUploadState[] {
  switch (action.type) {
    case "SELECT": {
      const newEntries: VideoUploadState[] = action.files.map((file) => ({
        status: "idle" as const,
        id: `${file.size}${file.name}${file.lastModified}`,
        file,
        name: file.name,
        size: file.size,
        type: file.type,
      }))

      const existingIds = new Set(state.map((s) => s.id))
      const unique = newEntries.filter((e) => !existingIds.has(e.id))

      return [...state, ...unique]
    }

    case "REMOVE":
      return state.filter((s) => s.id !== action.id)

    case "CLEAR":
      return []

    case "PREPARE":
      return state.map((s) =>
        s.id === action.id && s.status === "idle"
          ? { ...s, status: "preparing" as const, uploadId: null, key: null }
          : s,
      )

    case "SESSION_CREATED":
      return state.map((s) =>
        s.id === action.id && s.status === "preparing"
          ? { ...s, uploadId: action.uploadId, key: action.key }
          : s,
      )

    case "START_UPLOAD": {
      return state.map((s) => {
        if (s.id !== action.id) return s

        if (s.status === "preparing" || s.status === "failed") {
          const uploadState: VideoUploadState = {
            status: "uploading",
            id: s.id,
            file: s.file,
            name: s.name,
            size: s.size,
            type: s.type,
            uploadId: ("uploadId" in s ? s.uploadId : "") ?? "",
            key: ("key" in s ? s.key : "") ?? "",
            totalParts: action.chunks.length,
            uploadedParts: 0,
            failedParts: [],
            progress: 0,
            bytesUploaded: 0,
            bytesTotal: s.size,
            speed: 0,
            eta: null,
            retryCount: "retryCount" in s ? s.retryCount + 1 : 0,
            chunks: action.chunks,
            partProgress: {},
            partEtags: {},
            startedAt: Date.now(),
          }
          return uploadState
        }

        return s
      })
    }

    case "PART_PROGRESS":
      return state.map((s) => {
        if (
          s.id !== action.id ||
          (s.status !== "uploading" && s.status !== "paused")
        )
          return s

        const newPartProgress = {
          ...s.partProgress,
          [action.partNumber]:
            action.total > 0
              ? Math.floor((action.loaded / action.total) * 100)
              : 0,
        }

        const bytesUploaded = computeBytesUploaded(s.chunks, newPartProgress)
        const progress =
          s.bytesTotal > 0
            ? Math.floor((bytesUploaded / s.bytesTotal) * 100)
            : 0

        return {
          ...s,
          partProgress: newPartProgress,
          bytesUploaded,
          progress,
        }
      })

    case "PART_COMPLETED":
      return state.map((s) => {
        if (
          s.id !== action.id ||
          (s.status !== "uploading" && s.status !== "paused")
        )
          return s

        const newPartEtags = {
          ...s.partEtags,
          [action.partNumber]: action.etag,
        }
        const newPartProgress = {
          ...s.partProgress,
          [action.partNumber]: 100,
        }
        const uploadedParts = Object.keys(newPartEtags).length
        const bytesUploaded = computeBytesUploaded(s.chunks, newPartProgress)
        const progress =
          s.bytesTotal > 0
            ? Math.floor((bytesUploaded / s.bytesTotal) * 100)
            : 0

        return {
          ...s,
          partEtags: newPartEtags,
          partProgress: newPartProgress,
          uploadedParts,
          bytesUploaded,
          progress,
        }
      })

    case "PART_FAILED":
      return state.map((s) => {
        if (
          s.id !== action.id ||
          (s.status !== "uploading" && s.status !== "paused")
        )
          return s

        const failedParts = [...new Set([...s.failedParts, action.partNumber])]

        return { ...s, failedParts }
      })

    case "PAUSE":
      return state.map((s) =>
        s.id === action.id && s.status === "uploading"
          ? { ...s, status: "paused" as const }
          : s,
      )

    case "RESUME":
      return state.map((s) =>
        s.id === action.id && s.status === "paused"
          ? { ...s, status: "uploading" as const }
          : s,
      )

    case "COMPLETING":
      return state.map((s) =>
        s.id === action.id && s.status === "uploading"
          ? { ...s, status: "completing" as const }
          : s,
      )

    case "COMPLETED":
      return state.map((s) => {
        if (s.id !== action.id || s.status !== "completing") return s

        return {
          status: "completed" as const,
          id: s.id,
          file: s.file,
          name: s.name,
          size: s.size,
          type: s.type,
          uploadId: s.uploadId,
          key: s.key,
          url: action.url,
          completedAt: Date.now(),
        }
      })

    case "FAILED":
      return state.map((s) => {
        if (s.id !== action.id) return s

        return {
          status: "failed" as const,
          id: s.id,
          file: s.file,
          name: s.name,
          size: s.size,
          type: s.type,
          uploadId: ("uploadId" in s ? s.uploadId : "") ?? "",
          key: ("key" in s ? s.key : "") ?? "",
          reason: action.reason,
          failedPartNumber: action.failedPartNumber,
          retryCount: "retryCount" in s ? s.retryCount : 0,
        }
      })

    case "CANCEL":
      return state.map((s) => {
        if (s.id !== action.id) return s

        return {
          status: "cancelled" as const,
          id: s.id,
          file: s.file,
          name: s.name,
          size: s.size,
          type: s.type,
          cancelledAt: Date.now(),
        }
      })

    case "RETRY": {
      return state.map((s) => {
        if (s.id !== action.id) return s
        if (
          s.status !== "failed" &&
          s.status !== "uploading" &&
          s.status !== "paused"
        )
          return s

        const retryState: VideoUploadState = {
          status: "uploading",
          id: s.id,
          file: s.file,
          name: s.name,
          size: s.size,
          type: s.type,
          uploadId: ("uploadId" in s ? s.uploadId : "") ?? "",
          key: ("key" in s ? s.key : "") ?? "",
          totalParts: "chunks" in s ? s.chunks.length : 0,
          uploadedParts: "partEtags" in s ? Object.keys(s.partEtags).length : 0,
          failedParts: [],
          progress: "progress" in s ? s.progress : 0,
          bytesUploaded: "bytesUploaded" in s ? s.bytesUploaded : 0,
          bytesTotal: s.size,
          speed: 0,
          eta: null,
          retryCount: "retryCount" in s ? s.retryCount + 1 : 0,
          chunks: "chunks" in s ? s.chunks : [],
          partProgress:
            "partEtags" in s
              ? Object.fromEntries(
                  Object.keys(s.partEtags).map((k) => [k, 100]),
                )
              : {},
          partEtags: "partEtags" in s ? s.partEtags : {},
          startedAt: Date.now(),
        }
        return retryState
      })
    }

    default:
      return state
  }
}

function computeBytesUploaded(
  chunks: PartChunk[],
  partProgress: Record<number, number>,
): number {
  let total = 0
  for (const chunk of chunks) {
    const pct = partProgress[chunk.partNumber] ?? 0
    total += Math.floor(chunk.size * (pct / 100))
  }
  return total
}
