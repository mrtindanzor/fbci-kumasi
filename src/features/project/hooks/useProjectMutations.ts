import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { ProjectInput } from "../project.contract.types"
import { projectDetailQueryKey, projectListQueryKey } from "../project.queries"
import { useProjectService } from "./useProjectService"

export function useCreateProject() {
  const qc = useQueryClient()
  const service = useProjectService()

  return useMutation({
    mutationFn: (data: ProjectInput) => service.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: projectListQueryKey() })
    },
  })
}

export function useUpdateProject() {
  const qc = useQueryClient()
  const service = useProjectService()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ProjectInput> }) =>
      service.update(id, data),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: projectListQueryKey() })
      qc.invalidateQueries({ queryKey: projectDetailQueryKey(id) })
    },
  })
}

export function useDeleteProject() {
  const qc = useQueryClient()
  const service = useProjectService()

  return useMutation({
    mutationFn: (id: string) => service.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: projectListQueryKey() })
    },
  })
}
