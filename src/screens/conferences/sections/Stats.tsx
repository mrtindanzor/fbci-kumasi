import { motion } from "framer-motion"
import { AnimatePosition, slideUp, staggerContainer } from "@/shared/ui/Framer"
import { conferenceData } from "../data"

export function Stats() {
	return (
		<section className="section-gap bg-surface">
			<div className="container-app">
				<motion.div
					variants={staggerContainer}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true }}
					className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
				>
					{conferenceData.stats.map((stat) => (
						<motion.div
							key={stat.label}
							variants={slideUp}
							className="text-center"
						>
							<p className="text-4xl md:text-5xl font-headline font-bold text-primary">
								{stat.value}
							</p>
							<p className="text-on-surface-variant mt-2">{stat.label}</p>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	)
}
