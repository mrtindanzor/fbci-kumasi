const DEFAULT_ACCEPTED_TYPES = [
  "video/mp4",
  "video/webm",
  "video/ogg",
  "video/quicktime",
  "video/x-msvideo",
  "video/x-matroska",
]

const DEFAULT_MAX_SIZE_MB = 500

type VideoRulesResult = { valid: true } | { valid: false; reason: string }

export function checkVideoRules(
  file: File,
  config?: { acceptedTypes?: string[]; maxFileSizeMB?: number },
): VideoRulesResult {
  const acceptedTypes = config?.acceptedTypes ?? DEFAULT_ACCEPTED_TYPES
  const maxFileSizeMB = config?.maxFileSizeMB ?? DEFAULT_MAX_SIZE_MB
  const maxFileSizeBytes = maxFileSizeMB * 1024 * 1024

  if (!acceptedTypes.includes(file.type)) {
    const formats = acceptedTypes.map((t) => t.replace("video/", "")).join(", ")
    return {
      valid: false,
      reason: `Video format not supported. Allowed formats: ${formats}`,
    }
  }

  if (file.size > maxFileSizeBytes) {
    return {
      valid: false,
      reason: `Video size exceeds ${maxFileSizeMB}MB limit`,
    }
  }

  return { valid: true }
}
