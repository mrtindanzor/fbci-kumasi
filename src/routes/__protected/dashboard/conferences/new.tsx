import { createFileRoute } from "@tanstack/react-router"
import { generateMetaData } from "@/libs/tanstack"
import { ConferencePage } from "@/screens/dashboard/conferences"

export const Route = createFileRoute("/__protected/dashboard/conferences/new")({
  component: ConferencePage,
  head: () => ({
    meta: generateMetaData({
      title: "Create Conference",
      description: "Create a new FBCI annual conference",
      path: "dashboard/conferences/new",
    }),
  }),
})
