import { motion } from "framer-motion"
import { AnimatePosition, slideUp, staggerContainer } from "@/shared/ui/Framer"
import { pastorData } from "../data"

export function Timeline() {
	return (
		<section className="section-gap bg-primary text-white">
			<div className="container-app">
				<AnimatePosition variants={slideUp}>
					<h2 className="text-3xl md:text-4xl font-headline font-bold text-white text-center mb-12">
						Ministry Timeline
					</h2>
				</AnimatePosition>

				<motion.div
					variants={staggerContainer}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true }}
					className="max-w-3xl mx-auto space-y-8"
				>
					{pastorData.timeline.map((item) => (
						<motion.div
							key={item.period}
							variants={slideUp}
							className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
						>
							<div className="flex items-start gap-4">
								<span className="material-symbols-outlined text-3xl text-secondary mt-1">
									{item.icon}
								</span>
								<div>
									<p className="text-sm text-secondary font-semibold mb-1">
										{item.period}
									</p>
									<h3 className="text-xl font-headline font-semibold text-white mb-2">
										{item.title}
									</h3>
									<p className="text-white/70 leading-relaxed">
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
