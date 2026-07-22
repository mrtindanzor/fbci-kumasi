export function resetProgress(
  fileIds: string[],
  progress: Record<string, number | null>,
): Record<string, number | null> {
  const results = { ...progress }

  for (const id of fileIds) {
    results[id] = null
  }

  return results
}
