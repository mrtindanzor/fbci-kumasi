import { createFileRoute } from "@tanstack/react-router"
import { CollegePage } from "@/screens/college"
import { BRANDING } from "@/shared/constants"

export const Route = createFileRoute("/college")({
	component: CollegePage,
	head: () => ({
		title: `${BRANDING.college.name} | ${BRANDING.college.shortName}`,
		meta: [
			{
				name: "description",
				content: `Explore ${BRANDING.college.shortName} - empowering future ministry leaders with a transformative education in Christian faith.`,
			},
		],
	}),
})
