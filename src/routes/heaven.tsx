import { createFileRoute } from "@tanstack/react-router"
import { HeavenPage } from "@/screens/heaven"

export const Route = createFileRoute("/heaven")({
	component: HeavenPage,
	head: () => ({
		title: "The Way to Heaven",
		meta: [
			{
				name: "description",
				content:
					"Discover the foundational truths of salvation and find the peace that comes from a personal relationship with Christ.",
			},
		],
	}),
})
