import { createFileRoute } from "@tanstack/react-router"
import { ChurchesPage } from "@/screens/churches"
import { BRANDING } from "@/shared/constants"

export const Route = createFileRoute("/churches")({
	component: ChurchesPage,
	head: () => ({
		title: `Churches | ${BRANDING.name}`,
		meta: [
			{
				name: "description",
				content: `Find churches pastored by HACWA graduates and partner with ${BRANDING.name} in spreading the gospel.`,
			},
		],
	}),
})
