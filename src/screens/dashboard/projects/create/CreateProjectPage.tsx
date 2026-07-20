import { useState } from "react"
import { useImageImpUpload } from "@/features/images"
import { useCreateProject } from "@/features/project"
import { DashboardTopbar } from "@/screens/dashboard/layout/DashboardTopbar"
import { useNavigate } from "@/shared/hooks/useNavigate"
import { apiRoutes, routes } from "@/shared/routes"
import { ConfirmDialog } from "@/shared/ui/ConfirmDialog"
import { Button, Link } from "@/shared/ui/primitives/button"
import type { ProjectFormOutput } from "../components/ProjectForm"
import { ProjectForm } from "../components/ProjectForm"

export function CreateProjectPage() {
  const navigate = useNavigate()
  const createProject = useCreateProject()
  const [showDiscard, setShowDiscard] = useState(false)

  const uploads = useImageImpUpload({
    slots: {
      hero: { multiple: false, maxImageSizeInMB: 5 },
      gallery: {
        multiple: true,
        limit: 10,
        maxImageSizeInMB: 5,
        batchDelete: true,
      },
    },
    presignedUrlEndpoint: apiRoutes.images.projects.path,
  })

  const handleSubmit = async (data: ProjectFormOutput) => {
    const results = await uploads.uploadAll()

    const heroUrl = results.hero?.completed[0]?.url ?? ""
    const galleryUrls = results.gallery?.completed.map((img) => img.url) ?? []

    await createProject.mutateAsync({
      ...data,
      image: heroUrl,
      galleryImages: galleryUrls,
    })
    navigate.push(routes.dashboard.projects.home)
  }

  return (
    <div className="space-y-6">
      <DashboardTopbar title="Create New Project" />

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
        <span className="text-on-surface">New Project</span>
      </nav>

      <ProjectForm
        initialValues={{ funded: 0 }}
        onSubmit={handleSubmit}
        uploads={uploads}
      />

      <div className="flex justify-start">
        <Button
          type="button"
          variant="ghost"
          onClick={() => setShowDiscard(true)}
        >
          Discard Draft
        </Button>
      </div>

      <ConfirmDialog
        open={showDiscard}
        title="Discard Draft"
        description="Are you sure you want to discard this draft? All unsaved changes will be lost."
        confirmLabel="Discard"
        onConfirm={() => navigate.push(routes.dashboard.projects.home)}
        onCancel={() => setShowDiscard(false)}
      />
    </div>
  )
}
