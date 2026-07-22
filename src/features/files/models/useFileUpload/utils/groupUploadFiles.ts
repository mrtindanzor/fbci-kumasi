import type {
  ErrorFilePayload,
  ExistingFilePayload,
  FileUploadingPayload,
  GetPresignedUrlPayload,
  RawFilePayload,
} from "../../../files.contracts.types"
import type { Uploads } from "../useFileUpload.types"

export function groupUploadFiles(
  allUploads: Uploads,
  selectedSlotKeys: string[],
) {
  const unResolvedErrors = allUploads.filter(
    (file): file is ErrorFilePayload =>
      file.state === "error" && (file.exceedsSize || file.invalidFormat),
  )

  const selectedFiles: (GetPresignedUrlPayload & { file: File })[] = allUploads
    .filter(
      (upload): upload is RawFilePayload | ErrorFilePayload =>
        selectedSlotKeys.includes(upload.slotKey) &&
        ((upload.state === "error" &&
          !upload.exceedsSize &&
          !upload.invalidFormat) ||
          upload.state === "raw"),
    )
    .map((upload) => ({
      id: upload.id,
      slotKey: upload.slotKey,
      fileType: upload.file.type,
      file: upload.file,
    }))

  const alreadyUploaded = allUploads.filter(
    (upload): upload is ExistingFilePayload => upload.state === "uploaded",
  )

  const stillUploading = allUploads.filter(
    (upload): upload is FileUploadingPayload => upload.state === "uploading",
  )

  return { selectedFiles, alreadyUploaded, stillUploading, unResolvedErrors }
}
