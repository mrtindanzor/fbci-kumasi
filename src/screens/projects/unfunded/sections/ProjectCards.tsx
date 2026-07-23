import { motion } from "framer-motion"
import { useProjects } from "@/features/project"
import { slideUp } from "@/shared/ui/Framer"
import { ProjectCard } from "../../components/ProjectCard"
import { EmptyState } from "./EmptyState"

export function ProjectCards() {
  const { data: projects = [], isLoading } = useProjects()

  if (isLoading) return null
  if (projects.length === 0 && !isLoading) return <EmptyState />

  return (
    <section className="section-gap">
      <div className="container-app">
        <motion.ul
          variants={slideUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-x-4 gap-y-8 md:grid-cols-2 xl:grid-cols-3 mx-auto"
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
