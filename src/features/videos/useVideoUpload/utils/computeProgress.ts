import type { PartChunk } from "../../videos.contracts.types"

export function computeOverallProgress(
  chunks: PartChunk[],
  partProgress: Record<number, number>,
): number {
  if (chunks.length === 0) return 0

  let totalBytes = 0
  let uploadedBytes = 0

  for (const chunk of chunks) {
    totalBytes += chunk.size
    const pct = partProgress[chunk.partNumber] ?? 0
    uploadedBytes += Math.floor(chunk.size * (pct / 100))
  }

  if (totalBytes === 0) return 0
  return Math.floor((uploadedBytes / totalBytes) * 100)
}
