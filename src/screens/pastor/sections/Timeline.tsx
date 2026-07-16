import { motion } from "framer-motion"
import { AnimatePosition, slideUp, staggerContainer } from "@/shared/ui/Framer"
import { pastorData } from "../data"

export function Timeline() {
	return (
		<section className="section-gap bg-surface-container">
			<div className="container-app">
				<AnimatePosition variants={slideUp}>
					<h2 className="text-3xl md:text-4xl font-headline font-bold text-primary text-center mb-4">
						Ministry Timeline
					</h2>
					<p className="text-on-surface-variant text-center max-w-xl mx-auto mb-12">
						Tracing the footsteps of a faithful journey through the decades.
					</p>
				</AnimatePosition>

				<motion.div
					variants={staggerContainer}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true }}
					className="max-w-3xl mx-auto space-y-8"
				>
					{pastorData.timeline.map((item, index) => (
						<motion.div
							key={item.period}
							variants={slideUp}
							className="bg-surface rounded-2xl p-8 border border-outline-variant/30"
						>
							<div className="flex items-start gap-4">
								<span className="material-symbols-outlined text-3xl text-secondary mt-1">
									{item.icon}
								</span>
								<div>
									<p className="text-sm text-secondary font-semibold mb-1">
										{item.period}
									</p>
									<h3 className="text-xl font-headline font-semibold text-primary mb-2">
										{item.title}
									</h3>
									<p className="text-on-surface-variant leading-relaxed">
										{item.description}
									</p>
								</div>
							</div>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	)
}
