import { QueryClient } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { projectDetailQuery } from "@/features/project"
import { generateMetaData } from "@/libs/tanstack"
import { ProjectDetailPage } from "@/screens/projects"
import { HydrationProvider } from "@/shared/ui/HydationProvider"

export const Route = createFileRoute("/__public/projects/project/$id")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const qc = new QueryClient()
    const query = projectDetailQuery(params.id)
    const data = await qc.fetchQuery(query)
    return { queries: [{ queryKey: query.queryKey, data }], data }
  },
  head: ({ loaderData: { data } = {}, params }) => ({
    meta: generateMetaData({
      title: data?.title ?? "Project Details",
      description:
        data?.story ??
        "View project details and support FBCI's ongoing missions.",
      path: `projects/project/${params.id}`,
      images: data?.image,
    }),
  }),
})

function RouteComponent() {
  const { queries } = Route.useLoaderData()
  const { id } = Route.useParams()

  return (
    <HydrationProvider queries={queries}>
      <ProjectDetailPage id={id} />
    </HydrationProvider>
  )
}
