import { createFileRoute, Outlet } from "@tanstack/react-router"
import { authGuard, useAuthRefresh } from "@/features/auth"
import { AwaitAuthLoad, DashboardSidebar } from "@/screens/dashboard"

export const Route = createFileRoute("/__protected/dashboard")({
  component: DashboardLayout,
  beforeLoad: async () => {
    await authGuard.assertAuthenticated("/dashboard", "server")
  },
})

function DashboardLayout() {
  useAuthRefresh()

  return (
    <AwaitAuthLoad>
      <div className="flex min-h-screen bg-surface">
        <DashboardSidebar />
        <main className="py-24 sm:py-8 sm:ml-54 md:ml-64 flex-1 px-4">
          <Outlet />
        </main>
      </div>
    </AwaitAuthLoad>
  )
}
