import { useState } from "react"
import { useImageImpUpload } from "@/features/images"
import {
  useDeleteProject,
  useProject,
  useUpdateProject,
} from "@/features/project"
import { DashboardTopbar } from "@/screens/dashboard/layout/DashboardTopbar"
import { useNavigate } from "@/shared/hooks/useNavigate"
import { apiRoutes, routes } from "@/shared/routes"
import { ConfirmDialog } from "@/shared/ui/ConfirmDialog"
import { Button, Link } from "@/shared/ui/primitives/button"
import { Spinner } from "@/shared/ui/primitives/Spinner"
import { ProjectForm, type ProjectFormOutput } from "../components/ProjectForm"

type EditProjectPageProps = {
  projectId: string
}

export function EditProjectPage({ projectId }: EditProjectPageProps) {
  const navigate = useNavigate()
  const { data: project, isLoading } = useProject(projectId)
  const updateProject = useUpdateProject()
  const deleteProject = useDeleteProject()
  const [showDelete, setShowDelete] = useState(false)

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

  const handleSubmit = async (data: ProjectFormOutput) => {
    const results = await uploads.uploadAll()

    const heroUrl = results.hero?.completed[0]?.url ?? project?.image ?? ""
    const galleryUrls = [
      ...(results.gallery?.completed.map((img) => img.url) ?? []),
    ]

    await updateProject.mutateAsync({
      id: projectId,
      data: { ...data, image: heroUrl, galleryImages: galleryUrls },
    })
    navigate.push(routes.dashboard.projects.home)
  }

  const handleDelete = async () => {
    await uploads.deleteImages(["hero", "gallery"])
    await deleteProject.mutateAsync(projectId)
    navigate.push(routes.dashboard.projects.home)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner className="h-8 w-8" />
      </div>
    )
  }

  if (!project) {
    return (
      <div className="rounded-2xl bg-surface-container-lowest p-12 text-center shadow-sm">
        <p className="text-on-surface-variant">Project not found</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <DashboardTopbar title="Edit Project" />

      <nav className="flex items-center gap-2 text-sm text-on-surface-variant">
        <Link
          href={routes.dashboard.home}
          variant="ghost"
          size="sm"
          className="h-auto px-1 py-0.5"
        >
          Dashboard
        </Link>
        <span>/</span>
        <Link
          href={routes.dashboard.projects.home}
          variant="ghost"
          size="sm"
          className="h-auto px-1 py-0.5"
        >
          Projects
        </Link>
        <span>/</span>
        <span className="text-on-surface">Edit Project</span>
      </nav>

      <ProjectForm
        initialValues={project}
        onSubmit={handleSubmit}
        uploads={uploads}
      />

      <section className="rounded-2xl border border-error/20 bg-surface-container-lowest p-6 shadow-sm">
        <h2 className="font-headline text-lg text-error">Danger Zone</h2>
        <p className="mt-2 text-sm text-on-surface-variant">
          Permanently delete this project. This action cannot be undone.
        </p>
        <Button
          type="button"
          size="sm"
          className="mt-4 bg-error text-on-error hover:bg-error/90"
          onClick={() => setShowDelete(true)}
        >
          Delete Project
        </Button>
      </section>

      <ConfirmDialog
        open={showDelete}
        title="Delete Project"
        description={`Are you sure you want to delete "${project.title}"? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="danger"
        onConfirm={handleDelete}
        onCancel={() => setShowDelete(false)}
      />
    </div>
  )
}
