import { useApiClient } from "@/hooks/useApiClient"
import { useMemo } from "react"
import { createProjectService } from "../project.services"

export function useProjectService() {
	const { apiClient } = useApiClient()
	return useMemo(() => createProjectService(apiClient), [apiClient])
}
