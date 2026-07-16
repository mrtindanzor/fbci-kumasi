import { motion } from "framer-motion"
import { slideUp, staggerContainer } from "@/shared/ui/Framer"

export function BentoGrid() {
	return (
		<section className="section-gap">
			<div className="container-app">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
					<motion.div
						variants={staggerContainer}
						initial="hidden"
						whileInView="show"
						viewport={{ once: true }}
						className="space-y-6"
					>
						<motion.div
							variants={slideUp}
							className="bg-surface-container rounded-2xl p-8 border border-outline-variant/30"
						>
							<span className="material-symbols-outlined text-4xl text-secondary mb-3 block">
								auto_stories
							</span>
							<p className="text-2xl font-headline font-bold text-primary">
								50+ Courses
							</p>
						</motion.div>
						<motion.div
							variants={slideUp}
							className="bg-surface-container rounded-2xl p-8 border border-outline-variant/30"
						>
							<p className="text-2xl font-headline font-bold text-primary">
								#1
							</p>
							<p className="text-on-surface-variant text-sm mt-1">
								Ranked Ministry College
							</p>
						</motion.div>
					</motion.div>

					<motion.div
						variants={staggerContainer}
						initial="hidden"
						whileInView="show"
						viewport={{ once: true }}
						className="md:col-span-2"
					>
						<motion.div
							variants={slideUp}
							className="bg-surface-container rounded-2xl p-8 border border-outline-variant/30 h-full"
						>
							<p className="text-secondary font-semibold text-sm uppercase tracking-wider mb-4">
								A Vision of Wisdom
							</p>
							<p className="text-on-surface-variant leading-relaxed mb-4">
								Our institution stands as a beacon of learning in West Africa,
								combining traditional African values with modern pedagogical
								standards.
							</p>

							<div className="grid grid-cols-2 gap-4 mt-8">
								<div className="flex items-center gap-3">
									<span className="material-symbols-outlined text-2xl text-secondary">
										account_balance
									</span>
									<div>
										<p className="text-sm text-on-surface-variant">
											Community Driven
										</p>
									</div>
								</div>
								<div className="flex items-center gap-3">
									<span className="material-symbols-outlined text-2xl text-secondary">
										groups
									</span>
									<div>
										<p className="text-sm text-on-surface-variant">
											West Africa Hub
										</p>
									</div>
								</div>
							</div>
						</motion.div>
					</motion.div>
				</div>
			</div>
		</section>
	)
}
