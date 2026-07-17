import { Hero } from "./sections/Hero"
import { Newsletter } from "./sections/Newsletter"
import { PodcastSection } from "./sections/PodcastSection"
import { ResourceLibrary } from "./sections/ResourceLibrary"

export function ResourcesPage() {
	return (
		<main>
			<Hero />
			<PodcastSection />
			<ResourceLibrary />
			<Newsletter />
		</main>
	)
}
