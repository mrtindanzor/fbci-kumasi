import { CallToAction } from "./sections/CallToAction"
import { FeaturedMinistry } from "./sections/FeaturedMinistry"
import { HeavenCTA } from "./sections/HeavenCTA"
import { Hero } from "./sections/Hero2"
import { MediaMinistry } from "./sections/MediaMinistry"
import { OnDemand } from "./sections/OnDemand"
import { ServiceTimes } from "./sections/ServiceTimes"

export function HomePage() {
	return (
		<main>
			<Hero />
			<ServiceTimes />
			<HeavenCTA />
			<OnDemand />
			<MediaMinistry />
			<FeaturedMinistry />
			<CallToAction />
		</main>
	)
}
