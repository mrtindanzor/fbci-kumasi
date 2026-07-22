import { useState } from "react"
import {
  type Project,
  useDeleteProject,
  useProject,
  useUpdateProject,
} from "@/features/project"
import { DashboardTopbar } from "@/screens/dashboard/layout/DashboardTopbar"
import { routes } from "@/shared/routes"
import { ConfirmDialog } from "@/shared/ui/ConfirmDialog"
import { Button, Link } from "@/shared/ui/primitives/button"
import { Spinner } from "@/shared/ui/primitives/Spinner"
import { ProjectForm } from "../components/ProjectForm"

type EditProjectPageProps = {
  projectId: string
}

export function EditProjectPage({ projectId }: EditProjectPageProps) {
  const { data: project, isLoading } = useProject(projectId)

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

  return <EditProjectForm projectId={projectId} project={project} />
}

type EditProjectFormProps = {
  projectId: string
  project: Project
}
function EditProjectForm({ projectId, project }: EditProjectFormProps) {
  const { onSubmit, uploads, videoUpload } = useUpdateProject(project)
  const onDeleteProject = useDeleteProject({ projectId, uploads })
  const [showDelete, setShowDelete] = useState(false)

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
        onSubmit={(data) => onSubmit({ ...data, id: projectId })}
        uploads={uploads}
        videoUpload={videoUpload}
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
        onConfirm={onDeleteProject}
        onCancel={() => setShowDelete(false)}
      />
    </div>
  )
}
