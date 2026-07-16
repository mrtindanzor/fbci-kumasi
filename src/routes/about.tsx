import { createFileRoute } from "@tanstack/react-router"
import { AboutPage } from "@/screens/about"
import { BRANDING } from "@/shared/constants"

export const Route = createFileRoute("/about")({
	component: AboutPage,
	head: () => ({
		title: `About Us | ${BRANDING.name}`,
		meta: [
			{
				name: "description",
				content: `Learn about the legacy, beliefs, and leadership of ${BRANDING.name} - established in 1984.`,
			},
		],
	}),
})
