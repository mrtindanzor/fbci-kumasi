import { createFileRoute, Outlet } from "@tanstack/react-router"
import { DashboardSidebar } from "@/shared/layouts/DashboardSidebar"

export const Route = createFileRoute("/__protected/dashboard")({
  component: DashboardLayout,
})

function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-surface">
      <DashboardSidebar />
      <main className="ml-64 flex-1 p-8">
        <Outlet />
      </main>
    </div>
  )
}
