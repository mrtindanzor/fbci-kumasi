import { ContactForm } from "./sections/ContactForm"
import { ContactInfo } from "./sections/ContactInfo"
import { Hero } from "./sections/Hero"

export function ContactPage() {
	return (
		<main>
			<Hero />
			<ContactForm />
			<ContactInfo />
		</main>
	)
}
