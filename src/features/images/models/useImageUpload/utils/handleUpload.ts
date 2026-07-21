import type { FetchStatus } from "@/libs/fetchData"
import type {
  ErrorImagePayload,
  ExistingImagePayload,
  PresignedUrl,
} from "../../../images.contracts.types"

type handleUploadProps = {
  presigned: (PresignedUrl & { file: File })[]
  onUploadProgress(imageId: string, totalUploadedInPercentange: number): void
  uploadService({
    url,
    file,
    onUploadProgress,
  }: {
    url: string
    file: File
    onUploadProgress(totalInPercentage: number): void
  }): Promise<FetchStatus>
}

export async function handleUpload({
  presigned,
  onUploadProgress,
  uploadService,
}: handleUploadProps): Promise<
  ((ExistingImagePayload & { uuid: string }) | ErrorImagePayload)[]
> {
  const uploads = await Promise.all(
    presigned.map(
      async ({
        id,
        file,
        slotKey,
        ...uploadProps
      }): Promise<
        ErrorImagePayload | (ExistingImagePayload & { uuid: string })
      > => {
        if (uploadProps.state === "error")
          return {
            state: "error",
            previewImage: URL.createObjectURL(file),
            reason: uploadProps.reason,
            file,
            id,
            slotKey,
            exceedsSize: false,
            invalidFormat: uploadProps.invalidFormat,
          }

        const { uploadUrl, url: publicUrl } = uploadProps

        const upload = await uploadService({
          url: uploadUrl,
          file,
          onUploadProgress(totalInPercentage) {
            onUploadProgress(id, totalInPercentage)
          },
        })

        if (upload.error)
          return {
            state: "error",
            previewImage: URL.createObjectURL(file),
            reason: upload.message,
            file,
            id,
            slotKey,
            exceedsSize: false,
            invalidFormat: false,
          }

        return {
          state: "uploaded",
          slotKey,
          url: publicUrl,
          id,
          uuid: uploadProps.uuid,
        }
      },
    ),
  )

  return uploads
}
