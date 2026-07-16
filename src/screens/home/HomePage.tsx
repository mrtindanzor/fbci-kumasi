import { CallToAction } from "./sections/CallToAction"
import { ConferenceCTA } from "./sections/ConferenceCTA"
import { DiscipleshipCTA } from "./sections/DiscipleshipCTA"
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
			<ConferenceCTA />
			<DiscipleshipCTA />
			<OnDemand />
			<MediaMinistry />
			<FeaturedMinistry />
			<CallToAction />
		</main>
	)
}
