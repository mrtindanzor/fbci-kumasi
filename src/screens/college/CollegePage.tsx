import { About } from "./sections/About"
import { CallToAction } from "./sections/CallToAction"
import { Hero } from "./sections/Hero"
import { ProspectusPreview } from "./sections/ProspectusPreview"
import { WhatsInside } from "./sections/WhatsInside"

export function CollegePage() {
	return (
		<main>
			<Hero />
			<About />
			<ProspectusPreview />
			<WhatsInside />
			<CallToAction />
		</main>
	)
}
