import type { Project } from "@/features/project"
import { useProjects } from "@/features/project"
import { routes } from "@/shared/routes"
import { slideUp, staggerContainer } from "@/shared/ui/Framer"
import { Link } from "@/shared/ui/primitives/button"
import { Image } from "@/shared/ui/primitives/Image"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useMemo } from "react"

type RelatedProjectsProps = {
	currentId: string
}

export function RelatedProjects({ currentId }: RelatedProjectsProps) {
	const { data: projects = [] } = useProjects()
	const related = useMemo(() => {
		console.log(projects)
		return projects.filter((p) => p.id !== currentId).slice(0, 3)
	}, [projects, currentId])
	console.log(related, projects)

	if (related.length === 0) return null

	return (
		<div className="bg-surface-container-high p-6 rounded-xl border border-outline-variant sticky top-32">
			<h3 className="font-h4 text-h4 text-primary mb-6">Unfunded Projects</h3>
			<motion.ul
				variants={staggerContainer}
				initial="hidden"
				animate="show"
				className="grid h-fit gap-y-2"
			>
				{related.map((project) => (
					<RelatedProjectCard key={project.id} {...project} />
				))}
			</motion.ul>
		</div>
	)
}

function RelatedProjectCard({ image, title, funded, goal, id }: Project) {
	const progressPercent = Math.round((funded / goal) * 100)

	return (
		<motion.li
			variants={slideUp}
			className="bg-surface-container-lowest rounded-lg px-4 py-1.5 border border-outline-variant"
		>
			<div className="flex items-center gap-3 mb-2">
				<div className="w-12 h-12 rounded-md overflow-hidden shrink-0">
					<Image
						src={image}
						alt={title}
						className="w-full h-full object-cover"
					/>
				</div>
				<div className="flex-1 min-w-0">
					<h4 className="line-clamp-1 text-sm font-semibold text-primary">
						{title}
					</h4>
					<span className="font-label text-label text-secondary uppercase tracking-wider">
						{progressPercent}% funded
					</span>
				</div>
			</div>
			<div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
				<div
					className="h-full bg-secondary rounded-full"
					style={{ width: `${progressPercent}%` }}
				/>
			</div>
			<Link
				href={routes.projects.projectById(id)}
				variant="ghost"
				size="sm"
				className="w-full gap-x-2 mt-2 text-xs"
			>
				View Project <ArrowRight className="size-3" />
			</Link>
		</motion.li>
	)
}
