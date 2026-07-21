import { createFileRoute } from "@tanstack/react-router"
import { generateMetaData } from "@/libs/tanstack"
import { CreateProjectPage } from "@/screens/dashboard"

export const Route = createFileRoute("/__protected/dashboard/projects/new")({
  component: CreateProjectPage,
  head: () => ({
    meta: generateMetaData({
      title: "Create Project",
      description: "Create a new FBCI project",
      path: "dashboard/projects/new",
    }),
  }),
})
