import { useProjects } from "@/features/project"
import { useAuthenticatedUser } from "@/features/user"
import { DashboardTopbar } from "@/screens/dashboard/"
import { routes } from "@/shared/routes"
import { Link } from "@/shared/ui/primitives/button"
import { DashboardSummaryCards } from "./projects/DashboardSummaryCards"

export function DashboardHomePage() {
  const user = useAuthenticatedUser()
  const { data: projects = [] } = useProjects()

  return (
    <div className="space-y-8">
      <DashboardTopbar title={`Welcome back, ${user.name.split(" ")[0]}`} />

      <DashboardSummaryCards projects={projects} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl bg-surface-container-lowest p-6 shadow-sm">
          <h2 className="font-headline text-lg text-on-surface">
            Quick Actions
          </h2>
          <div className="mt-4 space-y-3">
            <Link
              href={routes.dashboard.projects.new}
              variant="secondary"
              size="sm"
              className="w-full justify-center"
            >
              <span className="material-symbols-outlined mr-2 text-base">
                add
              </span>
              Create New Project
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
