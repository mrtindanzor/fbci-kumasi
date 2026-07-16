import { createFileRoute } from "@tanstack/react-router"
import { HomePage } from "@/screens/home"
import { BRANDING } from "@/shared/constants"

export const Route = createFileRoute("/")({
	component: HomePage,
	head: () => ({
		title: `${BRANDING.name} | Modern Sanctuary`,
		meta: [
			{
				name: "description",
				content: `Welcome to ${BRANDING.name} - a modern sanctuary dedicated to transformative worship and global impact.`,
			},
		],
	}),
})
