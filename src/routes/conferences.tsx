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
					"Join the 2024 Global Sanctuary Summit - three days of deep spiritual immersion and strategic visioning.",
			},
		],
	}),
})
