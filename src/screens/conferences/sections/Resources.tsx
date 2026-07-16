import { motion } from "framer-motion"
import { AnimatePosition, slideUp, staggerContainer } from "@/shared/ui/Framer"
import { conferenceResources } from "../data"

export function Resources() {
	return (
		<section className="section-gap">
			<div className="container-app">
				<AnimatePosition variants={slideUp}>
					<div className="flex items-center justify-between mb-12">
						<h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">
							Conference Resources
						</h2>
						<button
							type="button"
							className="h-10 w-10 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface-container transition-colors"
						>
							<span className="material-symbols-outlined">filter_list</span>
						</button>
					</div>
				</AnimatePosition>

				<motion.div
					variants={staggerContainer}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true }}
					className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
				>
					{conferenceResources.map((resource) => (
						<motion.div
							key={resource.id}
							variants={slideUp}
							className="bg-surface-container rounded-2xl p-6 border border-outline-variant/30 flex items-center justify-between"
						>
							<div className="flex items-center gap-4">
								<span className="material-symbols-outlined text-3xl text-secondary">
									description
								</span>
								<div>
									<h3 className="font-headline font-semibold text-primary">
										{resource.title}
									</h3>
									<p className="text-on-surface-variant text-sm">
										{resource.format} • {resource.size}
									</p>
								</div>
							</div>
							<div className="flex gap-2">
								<button
									type="button"
									className="h-9 w-9 rounded-lg bg-surface border border-outline-variant flex items-center justify-center hover:bg-surface-container-high transition-colors"
								>
									<span className="material-symbols-outlined text-lg text-on-surface-variant">
										visibility
									</span>
								</button>
								<button
									type="button"
									className="h-9 w-9 rounded-lg bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-colors"
								>
									<span className="material-symbols-outlined text-lg">
										download
									</span>
								</button>
							</div>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	)
}
