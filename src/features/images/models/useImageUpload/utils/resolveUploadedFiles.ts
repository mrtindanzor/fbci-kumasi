import type {
  ErrorImagePayload,
  ExistingImagePayload,
  ImageUploadingPayload,
} from "../../../images.contracts.types"
import type { UploadingComplete } from "../useImageUpload.types"

type GroupUploadedFilesProps = {
  uploads: (ExistingImagePayload | ErrorImagePayload | ImageUploadingPayload)[]
}

export function resolveUploadedFiles({ uploads }: GroupUploadedFilesProps) {
  const results: Record<string, UploadingComplete | undefined> = {}

  uploads.forEach((upload) => {
    switch (upload.state) {
      case "uploaded": {
        results[upload.slotKey] = {
          completed: [...(results[upload.slotKey]?.completed ?? []), upload],
          uploading: results[upload.slotKey]?.uploading ?? [],
          errors: results[upload.slotKey]?.errors ?? [],
        }

        break
      }

      case "uploading": {
        results[upload.slotKey] = {
          uploading: [...(results[upload.slotKey]?.uploading ?? []), upload],
          completed: results[upload.slotKey]?.completed ?? [],
          errors: results[upload.slotKey]?.errors ?? [],
        }

        break
      }

      case "error": {
        results[upload.slotKey] = {
          errors: [...(results[upload.slotKey]?.errors ?? []), upload],
          uploading: results[upload.slotKey]?.uploading ?? [],
          completed: results[upload.slotKey]?.completed ?? [],
        }

        break
      }
    }
  })

  return results
}
