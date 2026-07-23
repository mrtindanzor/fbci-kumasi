import { QueryClient } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { conferenceQuery } from "@/features/conference"
import { generateMetaData } from "@/libs/tanstack"
import { ConferencesPage } from "@/screens/conferences"
import { HydrationProvider } from "@/shared/ui/HydationProvider"

export const Route = createFileRoute("/__public/conferences")({
  component: RouteComponent,
  loader: async () => {
    const qc = new QueryClient()
    const query = conferenceQuery()
    const data = await qc.fetchQuery(query)
    return { queries: [{ queryKey: query.queryKey, data }], data }
  },
  head: ({ loaderData: { data } = {} }) => ({
    meta: generateMetaData({
      title: data?.title ?? "Conferences",
      description:
        data?.shortIntro ??
        "Join the Annual Pastors & Workers Conference at FBCI Kumasi - a time of biblical teaching, spiritual renewal, and fellowship.",
      path: "conferences",
      images: data?.poster,
    }),
  }),
})

function RouteComponent() {
  const { queries } = Route.useLoaderData()

  return (
    <HydrationProvider queries={queries}>
      <ConferencesPage />
    </HydrationProvider>
  )
}
