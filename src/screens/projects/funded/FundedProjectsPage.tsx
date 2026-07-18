import { Hero } from "./sections/Hero"
import { OngoingSupport } from "./sections/OngoingSupport"
import { ProjectList } from "./sections/ProjectList"

export function FundedProjectsPage() {
	return (
		<main>
			<Hero />
			<ProjectList />
			<OngoingSupport />
		</main>
	)
}
