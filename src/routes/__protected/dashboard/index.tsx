import { createFileRoute } from "@tanstack/react-router"
import { generateMetaData } from "@/libs/tanstack"
import { DashboardHomePage } from "@/screens/dashboard"

export const Route = createFileRoute("/__protected/dashboard/")({
  component: DashboardHomePage,
  head: () => ({
    meta: generateMetaData({
      title: "Dashboard",
      description: "FBCI Admin Dashboard",
      path: "dashboard",
    }),
  }),
})
