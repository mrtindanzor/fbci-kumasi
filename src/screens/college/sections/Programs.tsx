import { motion } from "framer-motion"
import { AnimatePosition, slideUp, staggerContainer } from "@/shared/ui/Framer"
import { Button } from "@/shared/ui/primitives/button"

const programs = [
	{
		title: "Certificate in Ministry",
		duration: "6 Months",
		description:
			"A foundational program focusing on pastoral care, church administration, and basic theology. Perfect for those called to serve.",
		icon: "menu_book",
	},
	{
		title: "Diploma in Biblical Studies",
		duration: "2 Years",
		description:
			"An in-depth exploration of biblical languages, hermeneutics, and systematic theology.",
		icon: "auto_stories",
	},
	{
		title: "Associate in Leadership",
		duration: "18 Months",
		description:
			"Combining practical leadership skills with spiritual formation to equip future ministry leaders.",
		icon: "military_tech",
	},
]

export function Programs() {
	return (
		<section className="section-gap bg-surface-container">
			<div className="container-app">
				<AnimatePosition variants={slideUp}>
					<h2 className="text-3xl md:text-4xl font-headline font-bold text-primary text-center mb-4">
						Our Programs
					</h2>
					<p className="text-on-surface-variant text-center max-w-xl mx-auto mb-12">
						Academic Offerings
					</p>
				</AnimatePosition>

				<motion.div
					variants={staggerContainer}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true }}
					className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
				>
					{programs.map((program) => (
						<motion.div
							key={program.title}
							variants={slideUp}
							className="bg-surface rounded-2xl p-8 border border-outline-variant/30"
						>
							<span className="material-symbols-outlined text-4xl text-secondary mb-4 block">
								{program.icon}
							</span>
							<h3 className="text-xl font-headline font-semibold text-primary mb-2">
								{program.title}
							</h3>
							<p className="text-sm text-secondary font-semibold mb-4">
								{program.duration}
							</p>
							<p className="text-on-surface-variant text-sm leading-relaxed mb-6">
								{program.description}
							</p>
							<Button variant="secondary" size="sm">
								Learn More
								<span className="material-symbols-outlined text-lg">
									arrow_forward
								</span>
							</Button>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	)
}
