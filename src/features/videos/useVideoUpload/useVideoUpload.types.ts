import type {
  VideoUploadResult,
  VideoUploadState,
} from "../videos.contracts.types"

export type VideoUploadConfig = {
  chunkSizeMB?: number
  concurrency?: number
  acceptedTypes?: string[]
  maxFileSizeMB?: number
  video?: { url: string }
  deferDelete?: boolean
}

export type UseVideoUpload = {
  select: (files: File[]) => void
  uploadAll: () => Promise<VideoUploadResult | null>
  preview: () => VideoUploadState | null
  remove: () => void
  resetAll: () => void
  deleteVideo: () => Promise<void>
  pause: () => void
  resume: () => void
  retry: () => void
  cancel: () => void
  isUploading: boolean
}
