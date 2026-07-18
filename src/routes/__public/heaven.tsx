import { createFileRoute } from "@tanstack/react-router"
import { generateMetaData } from "@/libs/tanstack"
import { HeavenPage } from "@/screens/heaven"
import { opengraphs } from "@/shared/routes"

export const Route = createFileRoute("/__public/heaven")({
	component: HeavenPage,
	head: () => ({
		meta: generateMetaData({
			title: "The Way to Heaven",
			description:
				"Discover the foundational truths of salvation and find the peace that comes from a personal relationship with Christ.",
			path: "heaven",
			images: opengraphs.select("heaven"),
		}),
	}),
})
