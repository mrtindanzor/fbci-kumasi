import { QueryClient } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { projectListQuery } from "@/features/project"
import { generateMetaData } from "@/libs/tanstack"
import { FundedProjectsPage } from "@/screens/projects"
import { HydrationProvider } from "@/shared/ui/HydationProvider"

export const Route = createFileRoute("/__public/projects/funded")({
	component: RouteComponent,
	loader: async () => {
		const qc = new QueryClient()
		const query = projectListQuery({ status: "funded" })
		const data = await qc.fetchQuery(query)
		return { queries: [{ queryKey: query.queryKey, data }] }
	},
	head: () => ({
		meta: generateMetaData({
			title: "Funded Projects",
			description:
				"See the fully funded missions and community projects of FBCI.",
			path: "projects/funded",
		}),
	}),
})

function RouteComponent() {
	const { queries } = Route.useLoaderData()

	return (
		<HydrationProvider queries={queries}>
			<FundedProjectsPage />
		</HydrationProvider>
	)
}
