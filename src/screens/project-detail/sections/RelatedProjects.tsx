import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { projects } from "@/screens/projects/data"
import { routes } from "@/shared/routes"
import { slideUp, staggerContainer } from "@/shared/ui/Framer"
import { Link } from "@/shared/ui/primitives/button"

type RelatedProjectsProps = {
	currentId: string
}

export function RelatedProjects({ currentId }: RelatedProjectsProps) {
	const related = projects.filter((p) => p.id !== currentId).slice(0, 3)

	if (related.length === 0) return null

	return (
		<div className="bg-surface-container-high p-6 rounded-xl border border-outline-variant sticky top-32">
			<h3 className="font-h4 text-h4 text-primary mb-6">Related Projects</h3>
			<motion.ul
				variants={staggerContainer}
				initial="hidden"
				whileInView="show"
				viewport={{ once: true }}
				className="grid h-fit gap-y-2"
			>
				{related.map((project) => (
					<motion.li
						key={project.id}
						variants={slideUp}
						className="bg-surface-container-lowest rounded-lg px-4 py-1.5 border border-outline-variant"
					>
						<div className="flex items-center gap-3 mb-2">
							<div className="w-12 h-12 rounded-md overflow-hidden shrink-0">
								<img
									src={project.image}
									alt={project.title}
									className="w-full h-full object-cover"
								/>
							</div>
							<div className="flex-1 min-w-0">
								<h4 className="font-body-md text-body-md font-semibold text-primary truncate">
									{project.title}
								</h4>
								<span className="font-label text-label text-secondary uppercase tracking-wider">
									{Math.round(project.progressPercent)}% funded
								</span>
							</div>
						</div>
						<div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
							<div
								className="h-full bg-secondary rounded-full"
								style={{ width: `${project.progressPercent}%` }}
							/>
						</div>
						<Link
							href={routes.projects.projectById(project.id)}
							variant="ghost"
							size="sm"
							className="w-full gap-x-2 mt-2 text-xs"
						>
							View Project <ArrowRight className="size-3" />
						</Link>
					</motion.li>
				))}
			</motion.ul>
		</div>
	)
}
