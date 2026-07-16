import { createFileRoute } from "@tanstack/react-router"
import { MinistriesPage } from "@/screens/ministries"
import { BRANDING } from "@/shared/constants"

export const Route = createFileRoute("/ministries")({
	component: MinistriesPage,
	head: () => ({
		title: `Ministries | ${BRANDING.name}`,
		meta: [
			{
				name: "description",
				content: `Discover the ministries of ${BRANDING.name} - from Bible College to global missions.`,
			},
		],
	}),
})
