const SAMPLE_WINDOW_MS = 3000

type SpeedSample = {
  timestamp: number
  bytesUploaded: number
}

export function computeSpeedAndEta(
  samples: SpeedSample[],
  currentBytesUploaded: number,
  totalBytes: number,
): { speed: number; eta: number | null } {
  const now = Date.now()
  const windowStart = now - SAMPLE_WINDOW_MS

  const recent = samples.filter((s) => s.timestamp >= windowStart)
  if (recent.length < 2) {
    return { speed: 0, eta: null }
  }

  const first = recent[0]
  const last = recent.at(-1)

  if (!first || !last) return { speed: 0, eta: null }

  const elapsed = (last.timestamp - first.timestamp) / 1000

  if (elapsed <= 0) return { speed: 0, eta: null }

  const bytesDiff = last.bytesUploaded - first.bytesUploaded
  const speed = bytesDiff / elapsed

  if (speed <= 0) return { speed: 0, eta: null }

  const remainingBytes = totalBytes - currentBytesUploaded
  const eta = Math.ceil(remainingBytes / speed)

  return { speed, eta }
}

export function createSpeedTracker() {
  const samples: SpeedSample[] = []

  return {
    addSample(bytesUploaded: number) {
      samples.push({ timestamp: Date.now(), bytesUploaded })

      const cutoff = Date.now() - SAMPLE_WINDOW_MS * 2
      while (samples.length > 0 && (samples[0]?.timestamp ?? 0) < cutoff) {
        samples.shift()
      }
    },
    getSpeedAndEta(currentBytesUploaded: number, totalBytes: number) {
      return computeSpeedAndEta(samples, currentBytesUploaded, totalBytes)
    },
    reset() {
      samples.length = 0
    },
  }
}
