import { useMemo } from "react"
import { useApiClient } from "@/hooks/useApiClient"
import { createConferenceService } from "../conference.services"

export function useConferenceService() {
  const { apiClient } = useApiClient()
  return useMemo(() => createConferenceService(apiClient), [apiClient])
}
