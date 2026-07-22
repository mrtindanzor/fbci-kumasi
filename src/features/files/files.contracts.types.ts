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

export type FilePayload =
  | ExistingFilePayload
  | RawFilePayload
  | ErrorFilePayload
  | FileUploadingPayload

export type FileStates = "uploaded" | "error" | "uploading" | "raw"
export type WithFileSuccessState<T extends object> = { state: "uploaded" } & T
export type WithFileErrorState<T extends object> = { state: "error" } & T
export type WithUploadingState<T extends object> = { state: "uploading" } & T
export type WithRawFileState<T extends object> = { state: "raw" } & T

export type ExistingFilePayload = WithFileSuccessState<
  WithSlotKey<{
    id: string
    url: string
  }>
>

export type RawFilePayload = WithRawFileState<
  WithSlotKey<{
    id: string
    file: File
    previewUrl: string
  }>
>

export type FileUploadingPayload = WithUploadingState<
  WithSlotKey<{
    id: string
    file: File
    previewUrl: string
  }>
>

export type ErrorFilePayload = WithFileErrorState<
  WithSlotKey<{
    id: string
    file: File
    previewUrl: string
    reason: string
    invalidFormat: boolean
    exceedsSize: boolean
  }>
>

export type SlotConfig = {
  multiple: boolean
  limit?: number
  files?: Omit<ExistingFilePayload, "state" | "slotKey" | "id">[] | undefined
  maxFileSizeInMB?: number
  acceptedExtensions?: string[]
  batchDelete?: boolean
}

export type PreviewFileProps =
  | WithFileSuccessState<{ url: string; id: string; fileName: string }>
  | WithRawFileState<{ url: string; id: string; fileName: string }>
  | WithUploadingState<{
      id: string
      url: string
      fileName: string
      progress: number | null
    }>
  | WithFileErrorState<{
      url: string
      fileName: string
      invalidFormat: boolean
      exceedsSize: boolean
      reason: string
      id: string
    }>

export type RemoveFileProps<State extends FileStates> = State extends "uploaded"
  ? { url: string; id: string; state: State }
  : { id: string; state: State }

export type FilePreviewProps = {
  onRemoveFile: <State extends FileStates>(
    payload: RemoveFileProps<State>,
  ) => void
  buttonProps?: object
  retryUpload(id: string): Promise<void>
} & PreviewFileProps

export interface IFileService {
  getSignUrls(
    payload: GetPresignedUrlPayload[],
    endpoint: string,
  ): Promise<PresignedUrl[]>
  removeFile(url: string): Promise<FetchStatus>
  uploadFile({
    url,
    file,
    onUploadProgress,
  }: {
    url: string
    file: File
    onUploadProgress(totalInPercentage: number): void
  }): Promise<FetchStatus>
}
