import { conferenceQuery } from "@/features/conference"
import { generateMetaData } from "@/libs/tanstack"
import { ConferencesPage } from "@/screens/conferences"
import { HydrationProvider } from "@/shared/ui/HydationProvider"
import { QueryClient } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/__public/conferences")({
  component: RouteComponent,
  loader: async () => {
    const qc = new QueryClient()
    const query = conferenceQuery()
    const data = await qc.fetchQuery(query)
    return { queries: [{ queryKey: query.queryKey, data }] }
  },
  head: () => ({
    meta: generateMetaData({
      title: "Conferences",
      description:
        "Join the Annual Pastors & Workers Conference at FBCI Kumasi - a time of biblical teaching, spiritual renewal, and fellowship.",
      path: "conferences",
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
