import { createFileRoute } from "@tanstack/react-router"
import { generateMetaData } from "@/libs/tanstack"
import { ChurchesPage } from "@/screens/churches"
import { opengraphs } from "@/shared/routes"

export const Route = createFileRoute("/__public/churches")({
	component: ChurchesPage,
	head: () => ({
		meta: generateMetaData({
			title: "Churches",
			description:
				"Find churches pastored by HACWA graduates and partner with FBCI in spreading the gospel.",
			path: "churches",
			images: opengraphs.select("churches"),
		}),
	}),
})
