import type { PartChunk, VideoUploadState } from "../videos.contracts.types"

export type VideoUploadAction =
  | { type: "SELECT"; file: File }
  | { type: "SELECT_ERROR"; reason: string }
  | { type: "REMOVE" }
  | { type: "CLEAR" }
  | { type: "PREPARE" }
  | { type: "SESSION_CREATED"; uploadId: string; key: string }
  | { type: "START_UPLOAD"; chunks: PartChunk[] }
  | {
      type: "PART_PROGRESS"
      partNumber: number
      loaded: number
      total: number
    }
  | {
      type: "PART_COMPLETED"
      partNumber: number
      etag: string
    }
  | {
      type: "PART_FAILED"
      partNumber: number
    }
  | { type: "PAUSE" }
  | { type: "RESUME" }
  | { type: "COMPLETING" }
  | { type: "COMPLETED"; url: string }
  | {
      type: "FAILED"
      reason: string
      failedPartNumber: number | null
    }
  | { type: "CANCEL" }
  | { type: "RETRY" }

export function videoUploadReducer(
  state: VideoUploadState | null,
  action: VideoUploadAction,
): VideoUploadState | null {
  switch (action.type) {
    case "SELECT": {
      return {
        status: "idle",
        id: `${action.file.size}${action.file.name}${action.file.lastModified}`,
        file: action.file,
        name: action.file.name,
        size: action.file.size,
        type: action.file.type,
      }
    }

    case "SELECT_ERROR": {
      return { status: "error", reason: action.reason }
    }

    case "REMOVE":
      return null

    case "CLEAR":
      return null

    case "PREPARE":
      if (state?.status !== "idle") return state
      return { ...state, status: "preparing", uploadId: null, key: null }

    case "SESSION_CREATED":
      if (state?.status !== "preparing") return state
      return { ...state, uploadId: action.uploadId, key: action.key }

    case "START_UPLOAD": {
      if (!state || (state.status !== "preparing" && state.status !== "failed"))
        return state

      return {
        status: "uploading",
        id: state.id,
        file: state.file,
        name: state.name,
        size: state.size,
        type: state.type,
        uploadId: ("uploadId" in state ? state.uploadId : "") ?? "",
        key: ("key" in state ? state.key : "") ?? "",
        totalParts: action.chunks.length,
        uploadedParts: 0,
        failedParts: [],
        progress: 0,
        bytesUploaded: 0,
        bytesTotal: state.size,
        speed: 0,
        eta: null,
        retryCount: "retryCount" in state ? state.retryCount + 1 : 0,
        chunks: action.chunks,
        partProgress: {},
        partEtags: {},
        startedAt: Date.now(),
      }
    }

    case "PART_PROGRESS": {
      if (!state || (state.status !== "uploading" && state.status !== "paused"))
        return state

      const newPartProgress = {
        ...state.partProgress,
        [action.partNumber]:
          action.total > 0
            ? Math.floor((action.loaded / action.total) * 100)
            : 0,
      }

      const bytesUploaded = computeBytesUploaded(state.chunks, newPartProgress)
      const progress =
        state.bytesTotal > 0
          ? Math.floor((bytesUploaded / state.bytesTotal) * 100)
          : 0

      return {
        ...state,
        partProgress: newPartProgress,
        bytesUploaded,
        progress,
      }
    }

    case "PART_COMPLETED": {
      if (!state || (state.status !== "uploading" && state.status !== "paused"))
        return state

      const newPartEtags = {
        ...state.partEtags,
        [action.partNumber]: action.etag,
      }
      const newPartProgress = {
        ...state.partProgress,
        [action.partNumber]: 100,
      }
      const uploadedParts = Object.keys(newPartEtags).length
      const bytesUploaded = computeBytesUploaded(state.chunks, newPartProgress)
      const progress =
        state.bytesTotal > 0
          ? Math.floor((bytesUploaded / state.bytesTotal) * 100)
          : 0

      return {
        ...state,
        partEtags: newPartEtags,
        partProgress: newPartProgress,
        uploadedParts,
        bytesUploaded,
        progress,
      }
    }

    case "PART_FAILED": {
      if (!state || (state.status !== "uploading" && state.status !== "paused"))
        return state

      const failedParts = [
        ...new Set([...state.failedParts, action.partNumber]),
      ]

      return { ...state, failedParts }
    }

    case "PAUSE":
      if (state?.status !== "uploading") return state
      return { ...state, status: "paused" }

    case "RESUME":
      if (state?.status !== "paused") return state
      return { ...state, status: "uploading" }

    case "COMPLETING":
      if (state?.status !== "uploading") return state
      return { ...state, status: "completing" }

    case "COMPLETED":
      if (state?.status !== "completing") return state

      return {
        status: "completed",
        id: state.id,
        file: state.file,
        name: state.name,
        size: state.size,
        type: state.type,
        uploadId: state.uploadId,
        key: state.key,
        url: action.url,
        completedAt: Date.now(),
      }

    case "FAILED":
      if (!state || state.status === "error") return state

      return {
        status: "failed",
        id: state.id,
        file: state.file,
        name: state.name,
        size: state.size,
        type: state.type,
        uploadId: ("uploadId" in state ? state.uploadId : "") ?? "",
        key: ("key" in state ? state.key : "") ?? "",
        reason: action.reason,
        failedPartNumber: action.failedPartNumber,
        retryCount: "retryCount" in state ? state.retryCount : 0,
      }

    case "CANCEL":
      if (!state || state.status === "error") return state

      return {
        status: "cancelled",
        id: state.id,
        file: state.file,
        name: state.name,
        size: state.size,
        type: state.type,
        cancelledAt: Date.now(),
      }

    case "RETRY": {
      if (
        !state ||
        (state.status !== "failed" &&
          state.status !== "uploading" &&
          state.status !== "paused")
      )
        return state

      return {
        status: "uploading",
        id: state.id,
        file: state.file,
        name: state.name,
        size: state.size,
        type: state.type,
        uploadId: ("uploadId" in state ? state.uploadId : "") ?? "",
        key: ("key" in state ? state.key : "") ?? "",
        totalParts: "chunks" in state ? state.chunks.length : 0,
        uploadedParts:
          "partEtags" in state ? Object.keys(state.partEtags).length : 0,
        failedParts: [],
        progress: "progress" in state ? state.progress : 0,
        bytesUploaded: "bytesUploaded" in state ? state.bytesUploaded : 0,
        bytesTotal: state.size,
        speed: 0,
        eta: null,
        retryCount: "retryCount" in state ? state.retryCount + 1 : 0,
        chunks: "chunks" in state ? state.chunks : [],
        partProgress:
          "partEtags" in state
            ? Object.fromEntries(
                Object.keys(state.partEtags).map((k) => [k, 100]),
              )
            : {},
        partEtags: "partEtags" in state ? state.partEtags : {},
        startedAt: Date.now(),
      }
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
