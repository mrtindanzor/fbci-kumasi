import { createFileRoute } from "@tanstack/react-router"
import { DiscipleshipPage } from "@/screens/discipleship"
import { BRANDING } from "@/shared/constants"

export const Route = createFileRoute("/resources/discipleship")({
	component: DiscipleshipPage,
	head: () => ({
		title: `Discipleship Lessons | ${BRANDING.name}`,
		meta: [
			{
				name: "description",
				content: `Download free discipleship lesson booklets from ${BRANDING.name} to strengthen your walk with Christ.`,
			},
		],
	}),
})
