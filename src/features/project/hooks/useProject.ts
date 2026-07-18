import { useQuery } from "@tanstack/react-query"
import { projectDetailQuery } from "../project.queries"

export function useProject(id: string) {
	return useQuery(projectDetailQuery(id))
}
