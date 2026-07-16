import { motion } from "framer-motion"
import { AnimatePosition, slideUp, staggerContainer } from "@/shared/ui/Framer"
import { Button } from "@/shared/ui/primitives/button"
import { projects } from "../data"

const statusColors = {
	ongoing: "bg-tertiary/10 text-tertiary",
	urgent: "bg-error/10 text-error",
	funded: "bg-secondary/10 text-secondary",
}

export function ProjectCards() {
	return (
		<section className="section-gap">
			<div className="container-app">
				<motion.div
					variants={staggerContainer}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true }}
					className="space-y-8 max-w-4xl mx-auto"
				>
					{projects.map((project) => (
						<motion.div
							key={project.id}
							variants={slideUp}
							className="bg-surface-container rounded-2xl p-8 border border-outline-variant/30"
						>
							<div className="flex items-start justify-between mb-4">
								<div>
									<span
										className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusColors[project.status]}`}
									>
										{project.category}
									</span>
									<h3 className="text-xl font-headline font-semibold text-primary mt-3">
										{project.title}
									</h3>
								</div>
								<span className="text-sm text-on-surface-variant">
									{project.progressPercent}% Funded
								</span>
							</div>

							<p className="text-on-surface-variant leading-relaxed mb-6">
								{project.description}
							</p>

							<div className="mb-4">
								<div className="h-2 bg-outline-variant/30 rounded-full overflow-hidden">
									<motion.div
										className="h-full bg-tertiary rounded-full"
										initial={{ width: 0 }}
										whileInView={{ width: `${project.progressPercent}%` }}
										viewport={{ once: true }}
										transition={{ duration: 1, ease: "easeOut" }}
									/>
								</div>
							</div>

							<div className="flex items-center justify-between">
								<div>
									<span className="text-2xl font-bold text-primary">
										${project.funded.toLocaleString()}
									</span>
									<span className="text-on-surface-variant text-sm ml-2">
										Goal: ${project.goal.toLocaleString()}
									</span>
								</div>
								<Button variant="primary" size="sm">
									View Details
									<span className="material-symbols-outlined text-lg">
										arrow_forward
									</span>
								</Button>
							</div>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	)
}
