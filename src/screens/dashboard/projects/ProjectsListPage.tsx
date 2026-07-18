import { useProjects } from "@/features/project"
import { DashboardTopbar } from "@/shared/layouts/DashboardTopbar"
import { routes } from "@/shared/routes"
import { Link } from "@/shared/ui/primitives/button"
import { Spinner } from "@/shared/ui/primitives/Spinner"
import { ProjectCard } from "./ProjectCard"

export function ProjectsListPage() {
  const { data: projects = [], isLoading } = useProjects()

  return (
    <div className="space-y-6">
      <DashboardTopbar
        title="Projects"
        actions={
          <Link
            href={routes.dashboard.projects.new}
            variant="primary"
            size="sm"
          >
            <span className="material-symbols-outlined mr-1 text-base">
              add
            </span>
            Create New Project
          </Link>
        }
      />

      {isLoading && (
        <div className="flex justify-center py-12">
          <Spinner className="h-8 w-8" />
        </div>
      )}

      {!isLoading && projects.length === 0 && (
        <div className="rounded-2xl bg-surface-container-lowest p-12 text-center shadow-sm">
          <span className="material-symbols-outlined text-4xl text-on-surface-variant">
            folder_open
          </span>
          <p className="mt-4 text-on-surface-variant">No projects yet</p>
          <Link
            href={routes.dashboard.projects.new}
            variant="primary"
            size="sm"
            className="mt-4 inline-flex"
          >
            Create your first project
          </Link>
        </div>
      )}

      {!isLoading && projects.length > 0 && (
        <div className="space-y-4">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  )
}
