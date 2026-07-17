import { createFileRoute } from "@tanstack/react-router"
import { ProjectDetailPage } from "@/screens/project-detail"
import { BRANDING } from "@/shared/constants"

export const Route = createFileRoute("/projects/project/$id")({
	component: RouteComponent,
	head: () => ({
		title: `Project Details | ${BRANDING.name}`,
		meta: [
			{
				name: "description",
				content: `View project details and support ${BRANDING.name}'s ongoing missions.`,
			},
		],
	}),
})

function RouteComponent() {
	const { id } = Route.useParams()

	return <ProjectDetailPage id={id} />
}
