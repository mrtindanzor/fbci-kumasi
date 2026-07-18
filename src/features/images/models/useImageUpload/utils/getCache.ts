import type { SlotConfig } from "../../../images.contracts.types"
import type { Uploads } from "../useImageUpload.types"

export function getCacheFromSlots<T extends Record<string, SlotConfig>>(
  payload: T,
): Uploads {
  const results: Uploads = []

  for (const key in payload) {
    const images = payload[key]?.images ?? []

    if (images)
      images.forEach(({ url }) => {
        results.push({
          state: "uploaded",
          slotKey: key,
          url,
          id: crypto.randomUUID(),
        })
      })
  }

  return results
}
