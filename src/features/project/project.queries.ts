import { queryOptions } from "@tanstack/react-query"
import type { ProjectFilters } from "./project.contract.types"
import { projectService } from "./project.services"

export const projectListQueryKey = (filters?: ProjectFilters) => {
  const parts: string[] = []
  Object.entries(filters || {}).forEach(([key, value]) => {
    if (value) parts.push(`${key}:${value}`)
  })
  return ["projects", ...parts] as const
}

export const projectListQuery = (filters?: ProjectFilters) =>
  queryOptions({
    queryKey: projectListQueryKey(filters),
    queryFn: () => projectService.find(filters),
  })

export const projectDetailQueryKey = (id: string) => ["project", id] as const

export const projectDetailQuery = (id: string) =>
  queryOptions({
    queryKey: projectDetailQueryKey(id),
    queryFn: () => projectService.findById(id),
  })
