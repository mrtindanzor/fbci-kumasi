import { Beliefs } from "./sections/Beliefs"
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
		</main>
	)
}
