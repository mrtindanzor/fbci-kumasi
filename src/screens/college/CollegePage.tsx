import { Hero } from "./sections/Hero"
import { InquiryForm } from "./sections/InquiryForm"
import { Programs } from "./sections/Programs"
import { Stats } from "./sections/Stats"
import { WhyAttend } from "./sections/WhyAttend"

export function CollegePage() {
	return (
		<main>
			<Hero />
			<Stats />
			<Programs />
			<WhyAttend />
			<InquiryForm />
		</main>
	)
}
