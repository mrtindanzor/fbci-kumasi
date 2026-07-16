import { motion } from "framer-motion"
import { AnimatePosition, slideUp, staggerContainer } from "@/shared/ui/Framer"
import { collegeData } from "../data"

const statIcons = ["menu_book", "emoji_events", "groups", "public"]

export function Stats() {
	return (
		<section className="section-gap">
			<div className="container-app">
				<AnimatePosition variants={slideUp}>
					<h2 className="text-3xl md:text-4xl font-headline font-bold text-primary text-center mb-4">
						By The Numbers
					</h2>
					<p className="text-on-surface-variant text-center max-w-xl mx-auto mb-12">
						Our Impact
					</p>
				</AnimatePosition>

				<motion.div
					variants={staggerContainer}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true }}
					className="grid grid-cols-2 md:grid-cols-4 gap-6"
				>
					{collegeData.stats.map((stat, index) => (
						<motion.div
							key={stat.label}
							variants={slideUp}
							className="bg-surface-container rounded-2xl p-6 text-center border border-outline-variant/30"
						>
							<span className="material-symbols-outlined text-3xl text-secondary mb-2 block">
								{statIcons[index] ?? "info"}
							</span>
							<p className="text-2xl font-headline font-bold text-primary">
								{stat.value}
							</p>
							<p className="text-on-surface-variant text-sm mt-1">
								{stat.label}
							</p>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	)
}
