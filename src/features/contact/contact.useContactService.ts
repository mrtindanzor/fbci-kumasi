import { useMemo } from "react"
import { useApiClient } from "@/hooks/useApiClient"
import { createContactService } from "./contact.services"

export function useContactService() {
  const { apiClient } = useApiClient()

  return useMemo(() => createContactService(apiClient), [apiClient])
}
