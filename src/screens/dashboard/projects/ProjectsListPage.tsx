import { FolderOpen, Plus } from "lucide-react"
import { useProjects } from "@/features/project"
import { DashboardTopbar } from "@/screens/dashboard/"
import { routes } from "@/shared/routes"
import { Link } from "@/shared/ui/primitives/button"
import { Spinner } from "@/shared/ui/primitives/Spinner"
import { ProjectCard } from "./components/ProjectCard"

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
            <Plus className="size-5 mr-1" />
            New Project
          </Link>
        }
      />

      {isLoading && (
        <div className="flex justify-center py-12">
          <Spinner className="h-8 w-8" />
        </div>
      )}

      {!isLoading && projects.length === 0 && (
        <div className="rounded-2xl p-12 text-center">
          <FolderOpen className="size-5 mx-auto" />
          <p className="mt-4 text-on-surface-variant">No projects yet</p>
          <Link
            href={routes.dashboard.projects.new}
            variant="primary"
            size="sm"
            className="mt-4 inline-flex"
          >
            Let's create a new project
          </Link>
        </div>
      )}

      {!isLoading && projects.length > 0 && (
        <div className="@container">
          <ul className="grid h-fit @md:grid-cols-2 @2xl:grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-4">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
