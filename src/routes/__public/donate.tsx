import { createFileRoute } from "@tanstack/react-router"
import { generateMetaData } from "@/libs/tanstack"
import { DonatePage } from "@/screens/donate"
import { opengraphs } from "@/shared/routes"

export const Route = createFileRoute("/__public/donate")({
	component: DonatePage,
	head: () => ({
		meta: generateMetaData({
			title: "Donate",
			description:
				"Support FBCI through secure donations. Your stewardship enables global gospel outreach.",
			path: "donate",
			images: opengraphs.select("donate"),
		}),
	}),
})
