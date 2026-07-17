import { Biography } from "./sections/Biography"
import { FaithAndFamily } from "./sections/FaithAndFamily"
import { Hero } from "./sections/Hero"
import { Timeline } from "./sections/Timeline"

export function PastorPage() {
	return (
		<main>
			<Hero />
			<Biography />
			<Timeline />
			<FaithAndFamily />
		</main>
	)
}
