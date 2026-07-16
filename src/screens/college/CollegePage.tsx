import { BentoGrid } from "./sections/BentoGrid"
import { CallToAction } from "./sections/CallToAction"
import { Downloads } from "./sections/Downloads"
import { Hero } from "./sections/Hero"

export function CollegePage() {
	return (
		<main>
			<Hero />
			<BentoGrid />
			<Downloads />
			<CallToAction />
		</main>
	)
}
