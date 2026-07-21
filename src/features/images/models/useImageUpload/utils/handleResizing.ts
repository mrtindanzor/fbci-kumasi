import { imageCompressor } from "../../../compression/image-compression"
import type { ImagePayload } from "../../../images.contracts.types"
import type { Uploads } from "../useImageUpload.types"

type HandleResizingProps = {
  uploads: Uploads
}

export async function handleImageResizing({
  uploads,
}: HandleResizingProps): Promise<Uploads> {
  const images = await Promise.all(
    uploads.map(async (image): Promise<ImagePayload> => {
      if (image.state !== "raw") return image

      const compressed = await imageCompressor(image.file, {
        maxSizeMB: 0.7,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
        fileType: "webp",
      })

      if (!compressed.success)
        return {
          ...image,
          state: "error",
          invalidFormat: false,
          exceedsSize: false,
          reason: compressed.error,
        }

      return {
        ...image,
        state: "compressed",
        file: compressed.image,
        previewImage: URL.createObjectURL(compressed.image),
      }
    }),
  )

  return images
}
