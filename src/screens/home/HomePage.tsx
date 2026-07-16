import { CallToAction } from "./sections/CallToAction"
import { Hero } from "./sections/Hero"
import { MapSection } from "./sections/MapSection"
import { MediaMinistry } from "./sections/MediaMinistry"
import { MinistriesGrid } from "./sections/MinistriesGrid"
import { OnDemand } from "./sections/OnDemand"
import { PodbeanPlayer } from "./sections/PodbeanPlayer"
import { PodcastPlayer } from "./sections/PodcastPlayer"
import { ServiceTimes } from "./sections/ServiceTimes"

export function HomePage() {
	return (
		<main>
			<Hero />
			<PodbeanPlayer />
			<ServiceTimes />
			<OnDemand />
			<PodcastPlayer />
			<MediaMinistry />
			<MinistriesGrid />
			<CallToAction />
			<MapSection />
		</main>
	)
}
