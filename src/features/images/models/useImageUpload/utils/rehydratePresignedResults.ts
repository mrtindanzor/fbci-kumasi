import type {
  GetPresignedUrlPayload,
  PresignedUrl,
} from "../../../images.contracts.types"

export function rehydratePresignedResults(
  payload: PresignedUrl[],
  selectedFiles: (GetPresignedUrlPayload & { file: File })[],
) {
  const selected = new Map(selectedFiles.map((image) => [image.id, image]))

  return payload.map((image) => {
    const resolved = selected.get(image.id)

    if (!resolved)
      throw Error(`Failed to retrieve selected file for ${image.id}`)

    return { ...image, ...resolved }
  })
}
