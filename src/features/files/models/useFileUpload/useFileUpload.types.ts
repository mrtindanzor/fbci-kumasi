import type {
  ErrorFilePayload,
  ExistingFilePayload,
  FilePayload,
  FileStates,
  FileUploadingPayload,
  PreviewFileProps,
  RemoveFileProps,
  SlotConfig,
} from "../../files.contracts.types"

export type Uploads = FilePayload[]

export type UploadProgressMap = Record<string, number | null>
export type PendingDeletion = Record<string, Set<string>>

export type UploadingComplete = {
  completed: ExistingFilePayload[]
  errors: ErrorFilePayload[]
  uploading: FileUploadingPayload[]
}

export type PresignedUrlEndpoint<Path extends string> =
  Path extends `${string}/` ? never : Path extends `/${string}` ? Path : never

export type UseFileUpload<
  P extends readonly string[],
  T = Record<P[number], SlotConfig>,
> = {
  getUploads(): Uploads
  seed: (files: Uploads) => void
  select: (key: keyof T & string, files: File[]) => Promise<void>
  preview: (key: keyof T) => PreviewFileProps[]
  removeFile: <State extends FileStates>(
    payload: RemoveFileProps<State>,
  ) => Promise<void>
  uploadAll: () => Promise<Record<keyof T, UploadingComplete | undefined>>
  uploadPartial: <Selected extends (keyof T & string)[]>(
    keys: Selected,
  ) => Promise<Record<Selected[number], UploadingComplete | undefined>>
  resetAll: () => void
  resetPartial: <Selected extends (keyof T)[]>(keys: Selected) => void
  uploadOne: (key: keyof T, id: string) => Promise<void>
  deleteFiles: <Selected extends (keyof T)[]>(keys: Selected) => Promise<void>
}
