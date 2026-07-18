import { Categories } from "./sections/Categories"
import { DiscipleshipSection } from "./sections/DiscipleshipSection"
import { Hero } from "./sections/Hero"
import { PodcastSection } from "./sections/PodcastSection"
import { SalvationSection } from "./sections/SalvationSection"
import { YouTubeSection } from "./sections/YouTubeSection"

export function ResourcesPage() {
	return (
		<main>
			<Hero />
			<Categories />
			<PodcastSection />
			<YouTubeSection />
			<DiscipleshipSection />
			<SalvationSection />
		</main>
	)
}
