import { createFileRoute } from "@tanstack/react-router"
import { generateMetaData } from "@/libs/tanstack"
import { PastorPage } from "@/screens/pastor"
import { CHURCH_INFO } from "@/shared/db"
import { opengraphs } from "@/shared/routes"

export const Route = createFileRoute("/__public/pastor")({
	component: PastorPage,
	head: () => ({
		meta: generateMetaData({
			title: "Pastor's Biography",
			description: `Meet Pastor ${CHURCH_INFO.pastor.name} - ${CHURCH_INFO.pastor.role} of ${CHURCH_INFO.name}.`,
			path: "pastor",
			images: opengraphs.select("pastor"),
		}),
	}),
})
