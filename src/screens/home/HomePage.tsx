import { CallToAction } from "./sections/CallToAction"
import { ConferenceCTA } from "./sections/ConferenceCTA"
import { DiscipleshipCTA } from "./sections/DiscipleshipCTA"
import { FeaturedMinistry } from "./sections/FeaturedMinistry"
import { HeavenCTA } from "./sections/HeavenCTA"
import { Hero } from "./sections/Hero"
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
			<MediaMinistry />
			<OnDemand />
			<FeaturedMinistry />
			<CallToAction />
		</main>
	)
}
