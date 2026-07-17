import { motion } from "framer-motion"
import { AnimatePosition, slideUp, staggerContainer } from "@/shared/ui/Framer"
import { pastorData } from "../data"

export function Timeline() {
	return (
		<section className="section-gap bg-linear-to-b from-surface-container/20 via-surface to-surface-container/20">
			<div className="container-app">
				<AnimatePosition variants={slideUp}>
					<h2 className="text-3xl md:text-4xl font-headline font-bold text-primary-container text-center mb-12">
						Ministry Timeline
					</h2>
				</AnimatePosition>

				<motion.ul
					variants={staggerContainer}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true }}
					className="max-w-3xl mx-auto space-y-8"
				>
					{pastorData.timeline.map((item) => (
						<motion.li
							key={item.period}
							variants={slideUp}
							className="bg-surface border backdrop-blur-sm rounded-2xl p-8 border-surface-dim"
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
									<p className="text-primary/70 leading-relaxed">
										{item.description}
									</p>
								</div>
							</div>
						</motion.li>
					))}
				</motion.ul>
			</div>
		</section>
	)
}
