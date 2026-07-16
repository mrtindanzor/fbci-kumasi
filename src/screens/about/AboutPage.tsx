import { Beliefs } from "./sections/Beliefs"
import { CallToAction } from "./sections/CallToAction"
import { Hero } from "./sections/Hero"
import { Journey } from "./sections/Journey"
import { Leadership } from "./sections/Leadership"

export function AboutPage() {
	return (
		<main>
			<Hero />
			<Journey />
			<Beliefs />
			<Leadership />
			<CallToAction />
		</main>
	)
}
