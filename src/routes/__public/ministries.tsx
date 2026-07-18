import { createFileRoute } from "@tanstack/react-router"
import { generateMetaData } from "@/libs/tanstack"
import { MinistriesPage } from "@/screens/ministries"
import { opengraphs } from "@/shared/routes"

export const Route = createFileRoute("/__public/ministries")({
  component: MinistriesPage,
  head: () => ({
    meta: generateMetaData({
      title: "Ministries",
      description:
        "Discover the ministries of FBCI - from Bible College to global missions.",
      path: "ministries",
      images: opengraphs.select("ministries"),
    }),
  }),
})
