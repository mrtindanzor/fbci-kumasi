import { createFileRoute } from "@tanstack/react-router"
import { ResourcesPage } from "@/screens/resources"
import { BRANDING } from "@/shared/constants"

export const Route = createFileRoute("/resources")({
	component: ResourcesPage,
	head: () => ({
		title: `Resources | ${BRANDING.name}`,
		meta: [
			{
				name: "description",
				content: `Access sermons, lesson books, music, and study materials from ${BRANDING.name} and HACWA.`,
			},
		],
	}),
})
