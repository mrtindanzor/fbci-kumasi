import { motion } from "framer-motion"
import { AnimatePosition, slideUp, staggerContainer } from "@/shared/ui/Framer"
import { collegeData } from "../data"

export function WhatsInside() {
	return (
		<section className="section-gap">
			<div className="container-app">
				<AnimatePosition variants={slideUp}>
					<h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-2">
						What's Inside the Prospectus
					</h2>
					<div className="w-8 h-0.5 bg-secondary rounded-full mb-12" />
				</AnimatePosition>

				<motion.div
					variants={staggerContainer}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true }}
					className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
				>
					{collegeData.whatsInside.map((card) => (
						<motion.div
							key={card.title}
							variants={slideUp}
							className="bg-surface-container rounded-2xl p-6 border border-outline-variant/30 h-full hover:border-secondary/40 transition-colors duration-200"
						>
							<span className="material-symbols-outlined text-3xl text-secondary mb-4 block">
								{card.icon}
							</span>
							<h3 className="text-lg font-headline font-semibold text-primary mb-2">
								{card.title}
							</h3>
							<p className="text-sm text-on-surface-variant leading-relaxed">
								{card.description}
							</p>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	)
}
