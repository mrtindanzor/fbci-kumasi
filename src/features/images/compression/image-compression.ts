import imageCompresion from "browser-image-compression"
import { tryCatch } from "@/shared/utils/tryCatch"

export type ImageCompressionOptions = {
  maxSizeMB: number
  maxWidthOrHeight: number
  useWebWorker: boolean
  fileType: "avif" | "webp"
}

export async function imageCompressor(
  image: File,
  options: ImageCompressionOptions,
): Promise<{ success: true; image: File } | { success: false; error: string }> {
  const result = await tryCatch(
    imageCompresion(image, {
      ...options,
      fileType: `image/${options.fileType}`,
    }),
  )

  if (!result.success) return { success: false, error: result.error }
  return { success: true, image: result.data }
}
