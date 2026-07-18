import { createFileRoute } from "@tanstack/react-router"
import { generateMetaData } from "@/libs/tanstack"
import { ConferencesPage } from "@/screens/conferences"

export const Route = createFileRoute("/__public/conferences")({
	component: ConferencesPage,
	head: () => ({
		meta: generateMetaData({
			title: "Conferences",
			description:
				"Join the Annual Pastors & Workers Conference at FBCI Kumasi - a time of biblical teaching, spiritual renewal, and fellowship.",
			path: "conferences",
		}),
	}),
})
