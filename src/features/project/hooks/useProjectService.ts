import { useMemo } from "react"
import { useApiClient } from "@/hooks/useApiClient"
import { createProjectService } from "../project.services"

export function useProjectService() {
  const { apiClient } = useApiClient()
  return useMemo(() => createProjectService(apiClient), [apiClient])
}
