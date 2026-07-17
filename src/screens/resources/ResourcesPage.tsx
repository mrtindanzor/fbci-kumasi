import { Categories } from "./sections/Categories"
import { Hero } from "./sections/Hero"
import { PodcastSection } from "./sections/PodcastSection"
import { ResourceLibrary } from "./sections/ResourceLibrary"

export function ResourcesPage() {
	return (
		<main>
			<Hero />
			<Categories />
			<PodcastSection />
			<ResourceLibrary />
		</main>
	)
}
