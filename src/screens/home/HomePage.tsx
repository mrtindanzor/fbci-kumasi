import { CallToAction } from "./sections/CallToAction"
import { Hero } from "./sections/Hero"
import { MinistriesGrid } from "./sections/MinistriesGrid"
import { PodbeanPlayer } from "./sections/PodbeanPlayer"
import { ServiceTimes } from "./sections/ServiceTimes"

export function HomePage() {
	return (
		<main>
			<Hero />
			<PodbeanPlayer />
			<ServiceTimes />
			<MinistriesGrid />
			<CallToAction />
		</main>
	)
}
