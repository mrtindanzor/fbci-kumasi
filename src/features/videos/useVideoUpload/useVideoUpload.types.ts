import type { VideoUploadState } from "../videos.contracts.types"

export type VideoUploadConfig = {
  chunkSizeMB?: number
  concurrency?: number
  acceptedTypes?: string[]
  maxFileSizeMB?: number
}

export type UseVideoUpload = {
  select: (files: File[]) => void
  remove: (id: string) => void
  clear: () => void

  start: (id: string) => Promise<void>
  pause: (id: string) => void
  resume: (id: string) => void
  retry: (id: string) => void
  cancel: (id: string) => void

  getById: (id: string) => VideoUploadState | undefined
  getAll: () => VideoUploadState[]
  isUploading: boolean
}
