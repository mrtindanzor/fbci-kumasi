import type { FetchStatus } from "@/libs/fetchData"

export type PresignedUrl =
  | ({
      state: "success"
      uploadUrl: string
      url: string
      uuid: string
    } & GetPresignedUrlPayload)
  | ({
      state: "error"
      invalidFormat: boolean
      reason: string
    } & GetPresignedUrlPayload)

export type WithSlotKey<T extends object> = {
  slotKey: string
} & T

export type GetPresignedUrlPayload = WithSlotKey<{
  fileType: string
  id: string
}>

export type ImagePayload =
  | ExistingImagePayload
  | RawImagePayload
  | CompressedImagePayload
  | ErrorImagePayload
  | ImageUploadingPayload

export type ImageStates =
  | "uploaded"
  | "compressed"
  | "error"
  | "uploading"
  | "raw"
export type WithImageSuccessState<T extends object> = { state: "uploaded" } & T
export type WithImageErrorState<T extends object> = { state: "error" } & T
export type WithImageCompressedState<T extends object> = {
  state: "compressed"
} & T
export type WithUploadingState<T extends object> = { state: "uploading" } & T
export type WithRawImageState<T extends object> = { state: "raw" } & T

export type ExistingImagePayload = WithImageSuccessState<
  WithSlotKey<{
    id: string
    url: string
  }>
>

export type RawImagePayload = WithRawImageState<
  WithSlotKey<{
    id: string
    file: File
    previewImage: string
  }>
>

export type CompressedImagePayload = WithImageCompressedState<
  WithSlotKey<{
    id: string
    file: File
    previewImage: string
  }>
>

export type ImageUploadingPayload = WithUploadingState<
  WithSlotKey<{
    id: string
    file: File
    previewImage: string
  }>
>

export type ErrorImagePayload = WithImageErrorState<
  WithSlotKey<{
    id: string
    file: File
    previewImage: string
    reason: string
    invalidFormat: boolean
    exceedsSize: boolean
  }>
>

export type SlotConfig = {
  multiple: boolean
  limit?: number
  images?: Omit<ExistingImagePayload, "state" | "slotKey" | "id">[] | undefined
  maxImageSizeInMB?: number
  batchDelete?: boolean
}

export type PreviewImageProps =
  | WithImageSuccessState<{ url: string; id: string }>
  | WithImageCompressedState<{ url: string; id: string }>
  | WithRawImageState<{ url: string; id: string }>
  | WithUploadingState<{
      id: string
      url: string
      progress: number | null
    }>
  | WithImageErrorState<{
      url: string
      invalidFormat: boolean
      exceedsSize: boolean
      reason: string
      id: string
    }>

export type RemoveImageProps<State extends ImageStates> =
  State extends "uploaded"
    ? { url: string; id: string; state: State }
    : { id: string; state: State }

export type ImagePreviewProps = {
  onRemoveImage: <State extends ImageStates>(
    payload: RemoveImageProps<State>,
  ) => void
  buttonProps?: object
  retryUpload(id: string): Promise<void>
} & PreviewImageProps

export interface IImageService {
  getSignUrls(
    payload: GetPresignedUrlPayload[],
    endpoint: string,
  ): Promise<PresignedUrl[]>
  removeImage(url: string): Promise<FetchStatus>
  uploadImage({
    url,
    file,
    onUploadProgress,
  }: {
    url: string
    file: File
    onUploadProgress(totalInPercentage: number): void
  }): Promise<FetchStatus>
}
