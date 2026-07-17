import { createFileRoute } from "@tanstack/react-router"
import { DonatePage } from "@/screens/donate"
import { BRANDING } from "@/shared/constants"

export const Route = createFileRoute("/donate")({
	component: DonatePage,
	head: () => ({
		title: `Donate | ${BRANDING.name}`,
		meta: [
			{
				name: "description",
				content: `Support ${BRANDING.name} through secure donations. Your stewardship enables global gospel outreach.`,
			},
		],
	}),
})
