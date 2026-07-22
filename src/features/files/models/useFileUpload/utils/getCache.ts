import type { SlotConfig } from "../../../files.contracts.types"
import type { Uploads } from "../useFileUpload.types"

export function getCacheFromSlots<T extends Record<string, SlotConfig>>(
  payload: T,
): Uploads {
  const results: Uploads = []

  for (const key in payload) {
    const files = payload[key]?.files ?? []

    if (files)
      files.forEach(({ url }) => {
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
