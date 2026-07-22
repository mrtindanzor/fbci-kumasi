import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useCallback } from "react"
import { type UseImageUpload, useImageImpUpload } from "@/features/images"
import { useVideoUpload } from "@/features/videos"
import { useNavigate } from "@/shared/hooks/useNavigate"
import { apiRoutes, routes } from "@/shared/routes"
import type { Project, ProjectInput } from "../project.contract.types"
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

export function useUpdateProject(project: Project) {
  const qc = useQueryClient()
  const service = useProjectService()
  const navigate = useNavigate()

  const updateProject = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ProjectInput> }) =>
      service.update(id, data),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: projectListQueryKey() })
      qc.invalidateQueries({ queryKey: projectDetailQueryKey(id) })
    },
  })

  const uploads = useImageImpUpload({
    slots: {
      hero: {
        multiple: false,
        maxImageSizeInMB: 3,
        images: project?.image ? [{ url: project.image }] : [],
      },
      gallery: {
        multiple: true,
        limit: 10,
        maxImageSizeInMB: 3,
        batchDelete: true,
        images: project?.galleryImages.map((url) => ({ url })),
      },
    },
    presignedUrlEndpoint: apiRoutes.images.projects.path,
  })

  const videoUpload = useVideoUpload(
    project?.videoUrl
      ? { video: { url: project.videoUrl }, deferDelete: true }
      : undefined,
  )

  const onSubmit = useCallback(
    async (data: Project) => {
      const results = await uploads.uploadAll()

      const heroUrl = results.hero?.completed[0]?.url ?? project?.image ?? ""
      const galleryUrls = [
        ...(results.gallery?.completed.map((img) => img.url) ?? []),
      ]

      const videoResult = await videoUpload.uploadAll()
      const videoUrl = videoResult?.url ?? ""

      await updateProject.mutateAsync({
        id: project.id,
        data: { ...data, image: heroUrl, galleryImages: galleryUrls, videoUrl },
      })

      await videoUpload.deleteVideo()
      videoUpload.resetAll()
      navigate.push(routes.dashboard.projects.home)
    },
    [uploads, navigate, updateProject, project, videoUpload],
  )

  return { onSubmit, uploads, videoUpload }
}

type UseDeleteProject = {
  uploads: UseImageUpload<["hero", "gallery"]>
  projectId: string
}
export function useDeleteProject({ uploads, projectId }: UseDeleteProject) {
  const navigate = useNavigate()
  const qc = useQueryClient()
  const service = useProjectService()

  const deleteProject = useMutation({
    mutationFn: (id: string) => service.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: projectListQueryKey() })
    },
  })

  return useCallback(async () => {
    await uploads.deleteImages(["hero", "gallery"])
    await deleteProject.mutateAsync(projectId)
    navigate.push(routes.dashboard.projects.home)
  }, [projectId, uploads, deleteProject, navigate])
}
