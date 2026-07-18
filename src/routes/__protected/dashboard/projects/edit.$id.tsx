import { createFileRoute } from "@tanstack/react-router"
import { generateMetaData } from "@/libs/tanstack"
import { EditProjectPage } from "@/screens/dashboard"

export const Route = createFileRoute(
  "/__protected/dashboard/projects/edit/$id",
)({
  component: EditProjectRoute,
  head: () => ({
    meta: generateMetaData({
      title: "Edit Project",
      description: "Edit FBCI project",
      path: "dashboard/projects/edit",
    }),
  }),
})

function EditProjectRoute() {
  const { id } = Route.useParams()
  return <EditProjectPage projectId={id} />
}
