import { createFileRoute } from "@tanstack/react-router"
import { PastorPage } from "@/screens/pastor"
import { BRANDING } from "@/shared/constants"

export const Route = createFileRoute("/pastor")({
	component: PastorPage,
	head: () => ({
		title: `Pastor's Biography | ${BRANDING.name}`,
		meta: [
			{
				name: "description",
				content: `Meet Pastor Samuel Anderson - Founder & Lead Shepherd of ${BRANDING.name} with over 30 years of ministry.`,
			},
		],
	}),
})
