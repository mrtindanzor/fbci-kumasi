import type { ErrorImagePayload } from "../../../images.contracts.types"

const imageReg = /[^[]]*(?<ext>(jpg|png|webp|jpeg|pjp|jpe|pjpeg|jfif))$/i

const extractImageExtenstion = (fileType?: string) => {
  const { ext } = imageReg.exec(fileType ?? "")?.groups ?? {}
  return ext
}

export function checkImageRules(
  file: File,
  MAX_IMAGE_SIZE_IN_MB: number,
): Omit<ErrorImagePayload, "slotKey"> | null {
  const extension = extractImageExtenstion(file.type)
  const MAX_FILE_SIZE = MAX_IMAGE_SIZE_IN_MB * 1024 * 1024
  const isExceedsSize = file.size > MAX_FILE_SIZE

  if (extension && !isExceedsSize) return null

  const state = {
    invalidFormat: !extension,
    exceedsSize: isExceedsSize,
    state: "error" as const,
    id: `${file.size}${file.name}${file.lastModified}`,
    previewImage: "",
    file,
  }

  if (!extension)
    return {
      ...state,
      reason: `Image format not supported! Allow formats are PNG, JPEG and WEBP`,
    }

  return {
    ...state,
    reason: `Image size exceeds allowed size! Max size allowed ${MAX_IMAGE_SIZE_IN_MB}MB`,
  }
}
