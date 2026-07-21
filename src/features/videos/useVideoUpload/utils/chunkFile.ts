import type { PartChunk } from "../../videos.contracts.types"

export function chunkFile(file: File, chunkSizeMB: number): PartChunk[] {
  const chunkSizeBytes = chunkSizeMB * 1024 * 1024
  const totalParts = Math.ceil(file.size / chunkSizeBytes)
  const chunks: PartChunk[] = []

  for (let i = 0; i < totalParts; i++) {
    const start = i * chunkSizeBytes
    const end = Math.min(start + chunkSizeBytes, file.size)

    chunks.push({
      partNumber: i + 1,
      start,
      end,
      size: end - start,
    })
  }

  return chunks
}
