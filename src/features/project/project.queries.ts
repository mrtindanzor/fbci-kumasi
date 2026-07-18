import { queryOptions } from "@tanstack/react-query"
import type { ProjectFilters } from "./project.contract.types"
import { projectService } from "./project.services"

export const projectListQueryKey = (filters?: ProjectFilters) => {
  const parts: string[] = []
  if (filters?.status) parts.push(`status:${filters.status}`)
  if (filters?.page) parts.push(`page:${filters.page}`)
  if (filters?.limit) parts.push(`limit:${filters.limit}`)
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
