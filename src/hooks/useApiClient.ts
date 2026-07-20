import { useAuthStore } from "@/features/auth"
import { createFetchDataClient } from "@/libs/fetchData"
import { useMemo } from "react"

export function useApiClient() {
  const getAccessToken = useAuthStore((s) => s.getAccessToken)

  return useMemo(
    () => ({ apiClient: createFetchDataClient(getAccessToken) }),
    [getAccessToken],
  )
}
