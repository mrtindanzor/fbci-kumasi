import { motion } from "framer-motion"
import { ministries } from "@/shared/db"
import { AnimatePosition, slideUp, staggerContainer } from "@/shared/ui/Framer"

export function MinistriesGrid() {
	return (
		<section className="section-gap bg-surface-container">
			<div className="container-app">
				<AnimatePosition variants={slideUp}>
					<div className="flex items-center justify-between mb-12">
						<div>
							<h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">
								Our Ministries
							</h2>
						</div>
						<button
							type="button"
							className="inline-flex items-center gap-2 text-secondary font-semibold hover:underline"
						>
							View All Departments
							<span className="material-symbols-outlined text-lg">
								arrow_forward
							</span>
						</button>
					</div>
				</AnimatePosition>

				<motion.div
					variants={staggerContainer}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true }}
					className="grid grid-cols-2 md:grid-cols-4 gap-6"
				>
					{ministries.map((ministry) => (
						<motion.div
							key={ministry.id}
							variants={slideUp}
							className="bg-surface rounded-2xl p-6 text-center border border-outline-variant/30 hover:shadow-lg transition-shadow"
						>
							<span className="material-symbols-outlined text-4xl text-secondary mb-3 block">
								{ministry.icon}
							</span>
							<h3 className="font-headline font-semibold text-primary text-sm mb-1">
								{ministry.name}
							</h3>
							<p className="text-on-surface-variant text-xs">
								{ministry.description}
							</p>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	)
}
