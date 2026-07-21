export type CreateSessionPayload = {
  fileName: string
  fileSize: number
  fileType: string
  totalParts: number
}

export type CreateSessionResponse = {
  uploadId: string
  key: string
}

export type GetPresignedUrlsPayload = {
  uploadId: string
  key: string
  parts: Array<{ partNumber: number; size: number }>
}

export type PresignedPart = {
  partNumber: number
  uploadUrl: string
}

export type CompleteUploadPayload = {
  uploadId: string
  key: string
  parts: Array<{ partNumber: number; etag: string }>
}

export type CompleteUploadResponse = {
  url: string
}

export type AbortUploadPayload = {
  uploadId: string
  key: string
}

export type GetUploadedPartsPayload = {
  uploadId: string
  key: string
}

export type UploadedPart = {
  partNumber: number
  etag: string
  size: number
}

export interface IVideoService {
  createUploadSession(
    payload: CreateSessionPayload,
  ): Promise<CreateSessionResponse>

  getPresignedUrls(payload: GetPresignedUrlsPayload): Promise<PresignedPart[]>

  completeUpload(
    payload: CompleteUploadPayload,
  ): Promise<CompleteUploadResponse>

  abortUpload(payload: AbortUploadPayload): Promise<void>

  getUploadedParts(payload: GetUploadedPartsPayload): Promise<UploadedPart[]>
}

export type PartChunk = {
  partNumber: number
  start: number
  end: number
  size: number
}

export type VideoUploadState =
  | VideoIdleState
  | VideoPreparingState
  | VideoUploadingState
  | VideoPausedState
  | VideoCompletingState
  | VideoCompletedState
  | VideoFailedState
  | VideoCancelledState

export type VideoIdleState = {
  status: "idle"
  id: string
  file: File
  name: string
  size: number
  type: string
}

export type VideoPreparingState = {
  status: "preparing"
  id: string
  file: File
  name: string
  size: number
  type: string
  uploadId: string | null
  key: string | null
}

export type VideoUploadingState = {
  status: "uploading"
  id: string
  file: File
  name: string
  size: number
  type: string
  uploadId: string
  key: string
  totalParts: number
  uploadedParts: number
  failedParts: number[]
  progress: number
  bytesUploaded: number
  bytesTotal: number
  speed: number
  eta: number | null
  retryCount: number
  chunks: PartChunk[]
  partProgress: Record<number, number>
  partEtags: Record<number, string>
  startedAt: number
}

export type VideoPausedState = {
  status: "paused"
  id: string
  file: File
  name: string
  size: number
  type: string
  uploadId: string
  key: string
  totalParts: number
  uploadedParts: number
  failedParts: number[]
  progress: number
  bytesUploaded: number
  bytesTotal: number
  speed: number
  eta: number | null
  retryCount: number
  chunks: PartChunk[]
  partProgress: Record<number, number>
  partEtags: Record<number, string>
  startedAt: number
}

export type VideoCompletingState = {
  status: "completing"
  id: string
  file: File
  name: string
  size: number
  type: string
  uploadId: string
  key: string
  totalParts: number
  uploadedParts: number
  failedParts: number[]
  progress: number
  bytesUploaded: number
  bytesTotal: number
  speed: number
  eta: number | null
  retryCount: number
  chunks: PartChunk[]
  partProgress: Record<number, number>
  partEtags: Record<number, string>
  startedAt: number
}

export type VideoCompletedState = {
  status: "completed"
  id: string
  file: File
  name: string
  size: number
  type: string
  uploadId: string
  key: string
  url: string
  completedAt: number
}

export type VideoFailedState = {
  status: "failed"
  id: string
  file: File
  name: string
  size: number
  type: string
  uploadId: string | null
  key: string | null
  reason: string
  failedPartNumber: number | null
  retryCount: number
}

export type VideoCancelledState = {
  status: "cancelled"
  id: string
  file: File
  name: string
  size: number
  type: string
  cancelledAt: number
}

export type VideoUploadError = {
  id: string
  reason: string
  failedPartNumber: number | null
}
