import type {
  CompressedImagePayload,
  ErrorImagePayload,
  ExistingImagePayload,
  GetPresignedUrlPayload,
  ImageUploadingPayload,
} from "../../../images.contracts.types"
import type { Uploads } from "../useImageUpload.types"

export function groupUploadFiles(
  allUploads: Uploads,
  selectedSlotKeys: string[],
) {
  const unResolvedErrors = allUploads.filter(
    (image): image is ErrorImagePayload =>
      image.state === "error" && (image.exceedsSize || image.invalidFormat),
  )

  const selectedFiles: (GetPresignedUrlPayload & { file: File })[] = allUploads
    .filter(
      (upload): upload is CompressedImagePayload | ErrorImagePayload =>
        selectedSlotKeys.includes(upload.slotKey) &&
        ((upload.state === "error" &&
          !upload.exceedsSize &&
          !upload.invalidFormat) ||
          upload.state === "compressed"),
    )
    .map((upload) => ({
      id: upload.id,
      slotKey: upload.slotKey,
      fileType: upload.file.type,
      file: upload.file,
    }))

  const alreadyUploaded = allUploads.filter(
    (upload): upload is ExistingImagePayload => upload.state === "uploaded",
  )

  const stillUploading = allUploads.filter(
    (upload): upload is ImageUploadingPayload => upload.state === "uploading",
  )

  return { selectedFiles, alreadyUploaded, stillUploading, unResolvedErrors }
}
