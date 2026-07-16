import { ContactCTA } from "./sections/ContactCTA"
import { DownloadSection } from "./sections/DownloadSection"
import { FAQAccordion } from "./sections/FAQAccordion"
import { Hero } from "./sections/Hero"
import { QuestionForm } from "./sections/QuestionForm"
import { VideoGallery } from "./sections/VideoGallery"

export function HeavenPage() {
	return (
		<main>
			<Hero />
			<DownloadSection />
			<VideoGallery />
			<FAQAccordion />
			<QuestionForm />
			<ContactCTA />
		</main>
	)
}
