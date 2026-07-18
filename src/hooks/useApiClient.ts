import { useMemo } from "react"
import { useAuthStore } from "@/features/auth"
import { createFetchDataClient } from "@/libs/fetchData"

export function useApiClient() {
  const getAccessToken = useAuthStore((s) => s.getAccessToken)
  return useMemo(
    () => ({ apiClient: createFetchDataClient(getAccessToken) }),
    [getAccessToken],
  )
}
