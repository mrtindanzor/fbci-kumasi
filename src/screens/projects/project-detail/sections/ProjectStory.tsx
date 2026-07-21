import type { Project } from "@/features/project"
import { AnimatePosition, slideUp } from "@/shared/ui/Framer"

type ProjectStoryProps = {
  project: Project
}

export function ProjectStory({ project }: ProjectStoryProps) {
  return (
    <AnimatePosition variants={slideUp}>
      <article className="bg-surface-container-lowest p-8 rounded-lg">
        <div className="space-y-6 font-body-lg text-body-lg text-on-surface-variant whitespace-pre-line">
          {project.story}
        </div>
      </article>
    </AnimatePosition>
  )
}
