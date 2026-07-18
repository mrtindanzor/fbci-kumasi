import { createFileRoute } from "@tanstack/react-router"
import { generateMetaData } from "@/libs/tanstack"
import { ResourcesPage } from "@/screens/resources"
import { opengraphs } from "@/shared/routes"

export const Route = createFileRoute("/__public/resources/")({
  component: ResourcesPage,
  head: () => ({
    meta: generateMetaData({
      title: "Resources",
      description:
        "Access sermons, lesson books, music, and study materials from FBCI and HACWA.",
      path: "resources",
      images: opengraphs.select("resources"),
    }),
  }),
})
