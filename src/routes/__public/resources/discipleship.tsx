import { createFileRoute } from "@tanstack/react-router"
import { generateMetaData } from "@/libs/tanstack"
import { DiscipleshipPage } from "@/screens/discipleship"

export const Route = createFileRoute("/__public/resources/discipleship")({
  component: DiscipleshipPage,
  head: () => ({
    meta: generateMetaData({
      title: "Discipleship Lessons",
      description:
        "Download free discipleship lesson booklets from FBCI to strengthen your walk with Christ.",
      path: "resources/discipleship",
    }),
  }),
})
