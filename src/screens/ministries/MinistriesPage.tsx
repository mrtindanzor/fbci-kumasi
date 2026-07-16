import { Hero } from "./sections/Hero"
import { MinistryCards } from "./sections/MinistryCards"
import { Outreach } from "./sections/Outreach"

export function MinistriesPage() {
	return (
		<main>
			<Hero />
			<MinistryCards />
			<Outreach />
		</main>
	)
}
