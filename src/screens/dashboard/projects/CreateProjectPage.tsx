import { useState } from "react"
import { useCreateProject } from "@/features/project"
import { useNavigate } from "@/shared/hooks/useNavigate"
import { DashboardTopbar } from "@/shared/layouts/DashboardTopbar"
import { routes } from "@/shared/routes"
import { ConfirmDialog } from "@/shared/ui/ConfirmDialog"
import { Button, Link } from "@/shared/ui/primitives/button"
import { ProjectForm } from "./ProjectForm"

export function CreateProjectPage() {
  const navigate = useNavigate()
  const createProject = useCreateProject()
  const [showDiscard, setShowDiscard] = useState(false)

  const handleSubmit = async (
    data: Parameters<typeof createProject.mutateAsync>[0],
  ) => {
    await createProject.mutateAsync(data)
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

      <ProjectForm onSubmit={handleSubmit} />

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
