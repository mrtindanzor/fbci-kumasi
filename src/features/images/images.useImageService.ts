import { useMemo } from "react"
import { useApiClient } from "@/hooks/useApiClient"
import { createImageService } from "./images.services"

export function useImageService() {
  const { apiClient } = useApiClient()

  return useMemo(() => createImageService(apiClient), [apiClient])
}
