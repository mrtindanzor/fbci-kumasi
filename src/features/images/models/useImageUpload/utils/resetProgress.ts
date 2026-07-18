export function resetProgress(
  imageIds: string[],
  progress: Record<string, number | null>,
): Record<string, number | null> {
  const results = { ...progress }

  for (const id of imageIds) {
    results[id] = null
  }

  return results
}
