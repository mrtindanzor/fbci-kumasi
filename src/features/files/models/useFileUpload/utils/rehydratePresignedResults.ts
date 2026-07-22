import type {
  GetPresignedUrlPayload,
  PresignedUrl,
} from "../../../files.contracts.types"

export function rehydratePresignedResults(
  payload: PresignedUrl[],
  selectedFiles: (GetPresignedUrlPayload & { file: File })[],
) {
  const selected = new Map(selectedFiles.map((file) => [file.id, file]))

  return payload.map((file) => {
    const resolved = selected.get(file.id)

    if (!resolved)
      throw Error(`Failed to retrieve selected file for ${file.id}`)

    return { ...file, ...resolved }
  })
}
