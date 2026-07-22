import { useMemo } from "react"
import { useApiClient } from "@/hooks/useApiClient"
import { createFileService } from "./files.services"

export function useFileService() {
  const { apiClient } = useApiClient()

  return useMemo(() => createFileService(apiClient), [apiClient])
}
