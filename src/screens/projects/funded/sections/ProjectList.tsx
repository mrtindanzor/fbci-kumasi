import { motion } from "framer-motion"
import { useProjects } from "@/features/project"
import { staggerContainer } from "@/shared/ui/Framer"
import { ProjectCard } from "../../components/ProjectCard"
import { EmptyState } from "./EmptyState"

export function ProjectList() {
  const { data: projects = [] } = useProjects({ status: "funded" })

  if (projects.length === 0) return <EmptyState />

  return (
    <section className="section-gap">
      <div className="container-app">
        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
