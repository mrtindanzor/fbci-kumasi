import { createFileRoute } from "@tanstack/react-router"
import { ConferencesPage } from "@/screens/conferences"
import { BRANDING } from "@/shared/constants"

export const Route = createFileRoute("/conferences")({
	component: ConferencesPage,
	head: () => ({
		title: `Conferences | ${BRANDING.name}`,
		meta: [
			{
				name: "description",
				content:
					"Join the Annual Pastors & Workers Conference at FBCI Kumasi - a time of biblical teaching, spiritual renewal, and fellowship.",
			},
		],
	}),
})
