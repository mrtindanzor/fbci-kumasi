import { Hero } from "./sections/Hero"
import { InquiryForm } from "./sections/InquiryForm"
import { Registration } from "./sections/Registration"
import { Resources } from "./sections/Resources"
import { Stats } from "./sections/Stats"

export function ConferencesPage() {
	return (
		<main>
			<Hero />
			<Stats />
			<Resources />
			<Registration />
			<InquiryForm />
		</main>
	)
}
