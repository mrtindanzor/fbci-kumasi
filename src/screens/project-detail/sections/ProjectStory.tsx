import type { Project } from "@/screens/projects/data.types"
import { AnimatePosition, slideUp } from "@/shared/ui/Framer"

type ProjectStoryProps = {
	project: Project
}

export function ProjectStory({ project }: ProjectStoryProps) {
	return (
		<AnimatePosition variants={slideUp}>
			<article className="bg-surface-container-lowest py-8">
				<h2 className="font-h2 text-h2 text-primary mb-6">
					Our Vision for Growth
				</h2>
				<div className="space-y-6 font-body-lg text-body-lg text-on-surface-variant whitespace-pre-line">
					{project.story}
				</div>
			</article>
		</AnimatePosition>
	)
}
