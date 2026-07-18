import { createFileRoute } from "@tanstack/react-router"
import { generateMetaData } from "@/libs/tanstack"
import { ProjectsListPage } from "@/screens/dashboard"

export const Route = createFileRoute("/__protected/dashboard/projects/")({
  component: ProjectsListPage,
  head: () => ({
    meta: generateMetaData({
      title: "Projects",
      description: "Manage FBCI projects",
      path: "dashboard/projects",
    }),
  }),
})
