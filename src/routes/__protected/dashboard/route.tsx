import { authGuard, useAuthRefresh } from "@/features/auth"
import { DashboardSidebar } from "@/shared/layouts/DashboardSidebar"
import { createFileRoute, Outlet } from "@tanstack/react-router"

export const Route = createFileRoute("/__protected/dashboard")({
  component: DashboardLayout,
  beforeLoad: async () => {
    await authGuard.assertAuthenticated("/dashboard", "server")
  },
})

function DashboardLayout() {
  useAuthRefresh()

  return (
    <div className="flex min-h-screen bg-surface">
      <DashboardSidebar />
      <main className="ml-64 flex-1 p-8">
        <Outlet />
      </main>
    </div>
  )
}
