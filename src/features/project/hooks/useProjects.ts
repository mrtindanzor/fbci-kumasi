import { useQuery } from "@tanstack/react-query"
import type { ProjectFilters } from "../project.contract.types"
import { projectListQuery } from "../project.queries"

export function useProjects(filters?: ProjectFilters) {
  return useQuery(
    projectListQuery({ ...filters, status: filters?.status ?? "ongoing" }),
  )
}
