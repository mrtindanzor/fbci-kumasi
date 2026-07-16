import { Biography } from "./sections/Biography"
import { Hero } from "./sections/Hero"
import { Highlights } from "./sections/Highlights"
import { Timeline } from "./sections/Timeline"

export function PastorPage() {
	return (
		<main>
			<Hero />
			<Biography />
			<Timeline />
			<Highlights />
		</main>
	)
}
