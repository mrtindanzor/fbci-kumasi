import type {
  ErrorImagePayload,
  RawImagePayload,
  SlotConfig,
} from "../../../images.contracts.types"
import type { Uploads } from "../useImageUpload.types"
import { checkImageRules } from "./imageRules"

type HandleSelectedFilesProps<T extends Record<string, SlotConfig>> = {
  slotKey: keyof T & string
  uploads: Uploads
  files: File[]
  slot: SlotConfig
}

export function handleSelectedFiles<T extends Record<string, SlotConfig>>({
  slot,
  slotKey,
  uploads,
  files,
}: HandleSelectedFilesProps<T>): Uploads {
  const notBelongsToSlot = uploads.filter((image) => image.slotKey !== slotKey)
  const belongsToSlot = uploads.filter((image) => image.slotKey === slotKey)

  const { maxImageSizeInMB = 3, multiple, limit = multiple ? 10 : 1 } = slot

  if (limit === 1) {
    const file = files[0]
    if (!file) return uploads

    if (belongsToSlot.length > 0) return uploads

    const hasError = checkImageRules(file, maxImageSizeInMB)

    if (hasError) return [...notBelongsToSlot, { ...hasError, slotKey }]

    return [
      ...notBelongsToSlot,
      {
        state: "raw",
        file,
        id: `${file.size}${file.name}${file.lastModified}`,
        previewImage: URL.createObjectURL(file),
        slotKey,
      },
    ]
  }

  const newSelectedFiles: (RawImagePayload | ErrorImagePayload)[] = files.map(
    (file) => {
      const hasError = checkImageRules(file, maxImageSizeInMB)

      if (hasError) return { ...hasError, slotKey }

      return {
        state: "raw",
        file,
        id: `${file.size}${file.name}${file.lastModified}`,
        previewImage: URL.createObjectURL(file),
        slotKey,
      }
    },
  )

  const uniqueFiles = [
    ...new Map(
      [...belongsToSlot, ...newSelectedFiles]
        .toReversed()
        .map((image) => [image.id, image]),
    ).values(),
  ].toReversed()

  return [...notBelongsToSlot, ...uniqueFiles.slice(0, limit)]
}
