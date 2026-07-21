import { useProject } from "@/features/project"
import { Hero } from "./sections/Hero"
import { MediaViewer } from "./sections/MediaViewer"
import { ProjectStory } from "./sections/ProjectStory"
import { RelatedProjects } from "./sections/RelatedProjects"
import { SupportSection } from "./sections/SupportSection"

type ProjectDetailPageProps = {
  id: string
}

export function ProjectDetailPage({ id }: ProjectDetailPageProps) {
  const { data: project } = useProject(id)

  if (!project) return <ProjectNotFound />

  return (
    <main className="min-h-screen">
      <Hero project={project} />

      <section className="px-margin-mobile md:px-margin-desktop py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-16">
            <MediaViewer project={project} />
            <ProjectStory project={project} />
          </div>
          <div className="lg:col-span-4 space-y-6">
            <RelatedProjects currentId={project.id} />
          </div>
        </div>
      </section>

      <SupportSection project={project} />
    </main>
  )
}

function ProjectNotFound() {
  return (
    <main className="section-gap">
      <div className="container-app text-center">
        <h1 className="font-h1-mobile md:font-h1 text-h1-mobile md:text-h1 font-bold text-primary">
          Project Not Found
        </h1>
        <p className="text-on-surface-variant mt-4 font-body-lg text-body-lg">
          The project you are looking for does not exist.
        </p>
      </div>
    </main>
  )
}
