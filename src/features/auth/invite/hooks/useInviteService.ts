import { useMemo } from "react"
import { useApiClient } from "@/hooks/useApiClient"
import { createInviteService } from "../invite.service"

export function useInviteService() {
  const { apiClient } = useApiClient()
  return useMemo(() => createInviteService(apiClient), [apiClient])
}
