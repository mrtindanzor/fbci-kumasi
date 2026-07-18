import type {
  ErrorImagePayload,
  ExistingImagePayload,
} from "../../../images.contracts.types"
import type { Uploads } from "../useImageUpload.types"

export function handleSetUploadedImages(
  uploads: Uploads,
  uploaded: (ExistingImagePayload | ErrorImagePayload)[],
): Uploads {
  const lookup = new Map(uploaded.map((image) => [image.id, image]))
  const results = uploads.map((upload) => {
    const image = lookup.get(upload.id)

    return image ?? upload
  })

  return results
}
