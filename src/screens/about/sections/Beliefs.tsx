import { motion } from "framer-motion"
import { AnimatePosition, slideUp, staggerContainer } from "@/shared/ui/Framer"

const beliefs = [
	{
		icon: "auto_stories",
		title: "Scriptural Authority",
		description:
			"We believe the Bible is the inspired word of God, serving as the ultimate guide for faith and life.",
		reference: "2 Timothy 3:16-17",
	},
	{
		icon: "favorite",
		title: "Unconditional Love",
		description:
			"Our community is built on the radical love demonstrated by Christ, extending grace to all without reservation.",
		reference: "1 John 4:7-8",
	},
	{
		icon: "groups",
		title: "Intentional Fellowship",
		description:
			"Growth happens in circles, not just rows. We are committed to walking together through every season.",
		reference: "Hebrews 10:24-25",
	},
]

export function Beliefs() {
	return (
		<section className="section-gap bg-surface-container">
			<div className="container-app">
				<AnimatePosition variants={slideUp}>
					<h2 className="text-3xl md:text-4xl font-headline font-bold text-primary text-center mb-12">
						What We Believe
					</h2>
				</AnimatePosition>

				<motion.div
					variants={staggerContainer}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true }}
					className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
				>
					<motion.div
						variants={slideUp}
						className="md:col-span-2 bg-surface rounded-2xl p-8 border border-outline-variant/30"
					>
						<span className="material-symbols-outlined text-4xl text-secondary mb-4 block">
							{beliefs[0].icon}
						</span>
						<h3 className="text-xl font-headline font-semibold text-primary mb-3">
							{beliefs[0].title}
						</h3>
						<p className="text-on-surface-variant leading-relaxed mb-4">
							{beliefs[0].description}
						</p>
						<p className="text-sm text-secondary font-medium">
							{beliefs[0].reference}
						</p>
					</motion.div>

					<div className="space-y-6">
						{beliefs.slice(1).map((belief) => (
							<motion.div
								key={belief.title}
								variants={slideUp}
								className="bg-surface rounded-2xl p-8 border border-outline-variant/30"
							>
								<span className="material-symbols-outlined text-4xl text-secondary mb-4 block">
									{belief.icon}
								</span>
								<h3 className="text-xl font-headline font-semibold text-primary mb-3">
									{belief.title}
								</h3>
								<p className="text-on-surface-variant leading-relaxed mb-4">
									{belief.description}
								</p>
								<p className="text-sm text-secondary font-medium">
									{belief.reference}
								</p>
							</motion.div>
						))}
					</div>
				</motion.div>
			</div>
		</section>
	)
}
