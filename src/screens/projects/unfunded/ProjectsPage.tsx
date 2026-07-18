import { CallToAction } from "./sections/CallToAction"
import { Hero } from "./sections/Hero"
import { ProjectCards } from "./sections/ProjectCards"

export function ProjectsPage() {
	return (
		<main>
			<Hero />
			<ProjectCards />
			<CallToAction />
		</main>
	)
}
