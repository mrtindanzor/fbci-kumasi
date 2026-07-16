import { motion } from "framer-motion"
import { BRANDING } from "@/shared/constants"
import { AnimatePosition, slideUp, staggerContainer } from "@/shared/ui/Framer"

const reasons = [
	{
		icon: "people",
		title: "Faculty of Practitioners",
		description: "Classes taught by active pastors and ministry leaders.",
	},
	{
		icon: "church",
		title: "Field Training",
		description: "Direct engagement with local community ministries.",
	},
	{
		icon: "school",
		title: "Residential Program",
		description: "On-site housing and spiritual community life.",
	},
]

export function WhyAttend() {
	return (
		<section className="section-gap">
			<div className="container-app">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
					<AnimatePosition variants={slideUp}>
						<p className="text-secondary font-semibold text-sm uppercase tracking-wider mb-4">
							Why Attend?
						</p>
						<h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-6">
							Our Mission & Core Values
						</h2>
						<p className="text-on-surface-variant leading-relaxed mb-4">
							At {BRANDING.college.name}, we are dedicated to training a new
							generation of Christian leaders. Rooted in the Word and focused on
							real-world ministry, we provide an environment where academic
							excellence meets spiritual growth.
						</p>
						<p className="text-on-surface-variant leading-relaxed mb-8">
							Our mission is to equip students with the theological foundation,
							leadership skills, and compassionate heart necessary to serve
							effectively in a global context.
						</p>
					</AnimatePosition>

					<motion.div
						variants={staggerContainer}
						initial="hidden"
						whileInView="show"
						viewport={{ once: true }}
						className="space-y-6"
					>
						{reasons.map((reason) => (
							<motion.div
								key={reason.title}
								variants={slideUp}
								className="bg-surface-container rounded-2xl p-6 border border-outline-variant/30"
							>
								<div className="flex items-start gap-4">
									<span className="material-symbols-outlined text-3xl text-secondary mt-1">
										{reason.icon}
									</span>
									<div>
										<h3 className="text-lg font-headline font-semibold text-primary mb-1">
											{reason.title}
										</h3>
										<p className="text-on-surface-variant text-sm leading-relaxed">
											{reason.description}
										</p>
									</div>
								</div>
							</motion.div>
						))}
					</motion.div>
				</div>
			</div>
		</section>
	)
}
