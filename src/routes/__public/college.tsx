import { createFileRoute } from "@tanstack/react-router"
import { generateMetaData } from "@/libs/tanstack"
import { CollegePage } from "@/screens/college"
import { opengraphs } from "@/shared/routes"

export const Route = createFileRoute("/__public/college")({
	component: CollegePage,
	head: () => ({
		meta: generateMetaData({
			title: "Hyles-Anderson College of West Africa",
			description:
				"Explore HACWA - empowering future ministry leaders with a transformative education in Christian faith.",
			path: "college",
			images: opengraphs.select("college"),
		}),
	}),
})
