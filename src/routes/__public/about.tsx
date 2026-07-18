import { createFileRoute } from "@tanstack/react-router"
import { generateMetaData } from "@/libs/tanstack"
import { AboutPage } from "@/screens/about"
import { opengraphs } from "@/shared/routes"

export const Route = createFileRoute("/__public/about")({
	component: AboutPage,
	head: () => ({
		meta: generateMetaData({
			title: "About Us",
			description:
				"Learn about the legacy, beliefs, and leadership of FBCI - established in 1984.",
			path: "about",
			images: opengraphs.select("about"),
		}),
	}),
})
