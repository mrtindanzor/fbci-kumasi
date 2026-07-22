import type { ErrorFilePayload } from "../../../files.contracts.types"

const DEFAULT_ACCEPTED_EXTENSIONS = [
  "pdf",
  "doc",
  "docx",
  "xls",
  "xlsx",
  "ppt",
  "pptx",
  "txt",
  "csv",
]

export function checkFileRules(
  file: File,
  MAX_FILE_SIZE_IN_MB: number,
  acceptedExtensions?: string[],
): Omit<ErrorFilePayload, "slotKey"> | null {
  const extensions = acceptedExtensions ?? DEFAULT_ACCEPTED_EXTENSIONS
  const fileExtension = file.name.split(".").pop()?.toLowerCase() ?? ""
  const MAX_FILE_SIZE = MAX_FILE_SIZE_IN_MB * 1024 * 1024
  const isExceedsSize = file.size > MAX_FILE_SIZE
  const isValidExtension = extensions.includes(fileExtension)

  if (isValidExtension && !isExceedsSize) return null

  const state = {
    invalidFormat: !isValidExtension,
    exceedsSize: isExceedsSize,
    state: "error" as const,
    id: `${file.size}${file.name}${file.lastModified}`,
    previewUrl: "",
    file,
  }

  if (!isValidExtension)
    return {
      ...state,
      reason: `File format not supported! Accepted formats are: ${extensions.join(", ")}`,
    }

  return {
    ...state,
    reason: `File size exceeds allowed size! Max size allowed ${MAX_FILE_SIZE_IN_MB}MB`,
  }
}
