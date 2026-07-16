import { motion } from "framer-motion"
import { AnimatePosition, slideUp, staggerContainer } from "@/shared/ui/Framer"
import { conferenceData } from "../data"

export function Stats() {
	return (
		<section className="section-gap bg-surface">
			<div className="container-app">
				<AnimatePosition variants={slideUp}>
					<p className="text-on-surface-variant text-center mb-8">
						Joined by 500+ attendees
					</p>
				</AnimatePosition>

				<motion.div
					variants={staggerContainer}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true }}
					className="flex flex-wrap justify-center gap-8 mb-12"
				>
					<div className="flex items-center gap-2 text-on-surface-variant">
						<span className="material-symbols-outlined text-secondary">
							calendar_today
						</span>
						<span className="text-sm">Oct 12-14</span>
					</div>
					<div className="flex items-center gap-2 text-on-surface-variant">
						<span className="material-symbols-outlined text-secondary">
							location_on
						</span>
						<span className="text-sm">Main Campus</span>
					</div>
				</motion.div>

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
