import { useMemo } from "react"
import { useApiClient } from "@/hooks/useApiClient"
import { createVideoService } from "./videos.services"

export function useVideoService() {
  const { apiClient } = useApiClient()

  return useMemo(() => createVideoService(apiClient), [apiClient])
}
