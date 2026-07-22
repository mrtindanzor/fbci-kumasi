import type {
  ErrorFilePayload,
  RawFilePayload,
  SlotConfig,
} from "../../../files.contracts.types"
import type { Uploads } from "../useFileUpload.types"
import { checkFileRules } from "./fileRules"

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
  const notBelongsToSlot = uploads.filter((file) => file.slotKey !== slotKey)
  const belongsToSlot = uploads.filter((file) => file.slotKey === slotKey)

  const {
    maxFileSizeInMB = 10,
    multiple,
    limit = multiple ? 10 : 1,
    acceptedExtensions,
  } = slot

  if (limit === 1) {
    const file = files[0]
    if (!file) return uploads

    if (belongsToSlot.length > 0) return uploads

    const hasError = checkFileRules(file, maxFileSizeInMB, acceptedExtensions)

    if (hasError) return [...notBelongsToSlot, { ...hasError, slotKey }]

    return [
      ...notBelongsToSlot,
      {
        state: "raw",
        file,
        id: `${file.size}${file.name}${file.lastModified}`,
        previewUrl: URL.createObjectURL(file),
        slotKey,
      },
    ]
  }

  const newSelectedFiles: (RawFilePayload | ErrorFilePayload)[] = files.map(
    (file) => {
      const hasError = checkFileRules(file, maxFileSizeInMB, acceptedExtensions)

      if (hasError) return { ...hasError, slotKey }

      return {
        state: "raw",
        file,
        id: `${file.size}${file.name}${file.lastModified}`,
        previewUrl: URL.createObjectURL(file),
        slotKey,
      }
    },
  )

  const uniqueFiles = [
    ...new Map(
      [...belongsToSlot, ...newSelectedFiles]
        .toReversed()
        .map((file) => [file.id, file]),
    ).values(),
  ].toReversed()

  return [...notBelongsToSlot, ...uniqueFiles.slice(0, limit)]
}
