import { createFileRoute } from "@tanstack/react-router"
import { ProjectsPage } from "@/screens/projects"
import { BRANDING } from "@/shared/constants"

export const Route = createFileRoute("/projects")({
	component: ProjectsPage,
	head: () => ({
		title: `Projects | ${BRANDING.name}`,
		meta: [
			{
				name: "description",
				content: `Join ${BRANDING.name}'s ongoing missions and community projects making a global impact.`,
			},
		],
	}),
})
