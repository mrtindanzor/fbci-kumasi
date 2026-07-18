import type {
  ErrorImagePayload,
  ExistingImagePayload,
  ImagePayload,
  ImageStates,
  ImageUploadingPayload,
  PreviewImageProps,
  RemoveImageProps,
  SlotConfig,
} from "../../images.contracts.types"

export type Uploads = ImagePayload[]

export type UploadProgressMap = Record<string, number | null>
export type PendingDeletion = Record<string, Set<string>>

export type UploadingComplete = {
  completed: ExistingImagePayload[]
  errors: ErrorImagePayload[]
  uploading: ImageUploadingPayload[]
}

export type PresignedUrlEndpoint<Path extends string> =
  Path extends `${string}/` ? never : Path extends `/${string}` ? Path : never

export type UseImageUpload<
  P extends readonly string[],
  T = Record<P[number], SlotConfig>,
> = {
  select: (key: keyof T & string, files: File[]) => Promise<void>
  preview: (key: keyof T) => PreviewImageProps[]
  removeImage: <State extends ImageStates>(
    payload: RemoveImageProps<State>,
  ) => Promise<void>
  uploadAll: () => Promise<Record<keyof T, UploadingComplete | undefined>>
  uploadPartial: <Selected extends (keyof T & string)[]>(
    keys: Selected,
  ) => Promise<Record<Selected[number], UploadingComplete | undefined>>
  resetAll: () => void
  resetPartial: <Selected extends (keyof T)[]>(keys: Selected) => void
  uploadOne: (key: keyof T, id: string) => Promise<void>
  deleteImages: <Selected extends (keyof T)[]>(keys: Selected) => Promise<void>
}
