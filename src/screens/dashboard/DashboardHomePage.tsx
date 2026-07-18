import { useProjects } from "@/features/project"
import { useAuthenticatedUser } from "@/features/user"
import { DashboardTopbar } from "@/shared/layouts/DashboardTopbar"
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

        <div className="rounded-2xl bg-surface-container-lowest p-6 shadow-sm">
          <h2 className="font-headline text-lg text-on-surface">
            Institutional Goal
          </h2>
          <p className="mt-2 text-sm text-on-surface-variant">
            Expanding God's kingdom through education, evangelism, and community
            development.
          </p>
          <div className="mt-4">
            <div className="flex justify-between text-sm">
              <span className="text-on-surface-variant">Progress</span>
              <span className="font-medium text-on-surface">
                {projects.length > 0
                  ? `${Math.round((projects.filter((p) => p.status === "funded").length / projects.length) * 100)}%`
                  : "0%"}
              </span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface-container-high">
              <div
                className="h-full rounded-full bg-secondary transition-all"
                style={{
                  width: `${projects.length > 0 ? (projects.filter((p) => p.status === "funded").length / projects.length) * 100 : 0}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
