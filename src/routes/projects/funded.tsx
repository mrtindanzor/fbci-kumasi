import { createFileRoute } from "@tanstack/react-router"
import { FundedProjectsPage } from "@/screens/funded-projects"
import { BRANDING } from "@/shared/constants"

export const Route = createFileRoute("/projects/funded")({
	component: FundedProjectsPage,
	head: () => ({
		title: `Funded Projects | ${BRANDING.name}`,
		meta: [
			{
				name: "description",
				content: `See the fully funded missions and community projects of ${BRANDING.name}.`,
			},
		],
	}),
})
