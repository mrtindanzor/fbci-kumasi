import { createFileRoute } from "@tanstack/react-router"
import { generateMetaData } from "@/libs/tanstack"
import { ConferencePage } from "@/screens/dashboard/conferences"

export const Route = createFileRoute("/__protected/dashboard/conferences/")({
  component: ConferencePage,
  head: () => ({
    meta: generateMetaData({
      title: "Conferences",
      description: "Manage FBCI annual conferences",
      path: "dashboard/conferences",
    }),
  }),
})
