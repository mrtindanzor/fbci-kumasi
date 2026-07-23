import { createFileRoute } from "@tanstack/react-router"
import { generateMetaData } from "@/libs/tanstack"
import { HomePage } from "@/screens/home"
import { opengraphs } from "@/shared/routes"

export const Route = createFileRoute("/__public/")({
  component: HomePage,
  head: () => ({
    meta: generateMetaData({
      title: "Welcome",
      description:
        "Welcome to FBCI - a modern sanctuary dedicated to transformative worship and global impact.",
      path: "",
      images: opengraphs.select("home"),
    }),
  }),
})
