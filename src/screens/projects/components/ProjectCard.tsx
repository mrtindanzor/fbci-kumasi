import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import type { Project } from "@/features/project"
import { routes } from "@/shared/routes"
import { slideUp } from "@/shared/ui/Framer"
import { Link } from "@/shared/ui/primitives/button"
import { Image } from "@/shared/ui/primitives/Image"

type ProjectCardProps = Project

export function ProjectCard({ id, image, title }: ProjectCardProps) {
  return (
    <motion.li
      variants={slideUp}
      className="bg-surface-container relative overflow-hidden group/card"
    >
      <div className="overflow-hidden">
        <Image
          src={image}
          alt={title}
          className="w-full h-52 group-hover/card:scale-110 transition duration-800 ease-in-out object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-8 grid gap-y-1">
        <Link
          href={routes.projects.projectById(id)}
          variant="primary"
          size="sm"
          className="w-fit gap-x-2 link px-4 ml-auto py-1 rounded-full"
        >
          View
          <ArrowRight className="size-4.5" />
        </Link>
        <h3 className="text-xl font-headline font-semibold text-primary mt-3">
          {title}
        </h3>
      </div>
    </motion.li>
  )
}
