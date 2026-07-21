import { QueryClient } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { projectListQuery } from "@/features/project"
import { generateMetaData } from "@/libs/tanstack"
import { ProjectsPage } from "@/screens/projects"
import { HydrationProvider } from "@/shared/ui/HydationProvider"

export const Route = createFileRoute("/__public/projects/")({
  component: RouteComponent,
  loader: async () => {
    const qc = new QueryClient()
    const query = projectListQuery()
    const data = await qc.fetchQuery(query)
    return { queries: [{ queryKey: query.queryKey, data }] }
  },
  head: () => ({
    meta: generateMetaData({
      title: "Projects",
      description:
        "Join FBCI's ongoing missions and community projects making a global impact.",
      path: "projects",
    }),
  }),
})

function RouteComponent() {
  const { queries } = Route.useLoaderData()

  return (
    <HydrationProvider queries={queries}>
      <ProjectsPage />
    </HydrationProvider>
  )
}
