import { motion } from "framer-motion"
import { AnimatePosition, slideUp, staggerContainer } from "@/shared/ui/Framer"

const leaders = [
	{
		name: "Dr. Elias Anderson",
		role: "Senior Lead Pastor",
		description:
			"With over 30 years of ministry, Elias brings a deep love for theological scholarship and community transformation.",
		image: "https://picsum.photos/seed/pastor-elias/400/400",
	},
	{
		name: "Sarah Jenkins",
		role: "Director of Youth",
		description: "",
		image: "https://picsum.photos/seed/sarah/400/400",
	},
	{
		name: "Marcus Thorne",
		role: "Operations",
		description: "",
		image: "https://picsum.photos/seed/marcus/400/400",
	},
]

export function Leadership() {
	return (
		<section className="section-gap">
			<div className="container-app">
				<AnimatePosition variants={slideUp}>
					<div className="flex items-center justify-between mb-12">
						<div>
							<h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-2">
								Leadership
							</h2>
							<p className="text-on-surface-variant">
								The Hearts Behind the Vision
							</p>
						</div>
						<button
							type="button"
							className="inline-flex items-center gap-2 text-secondary font-semibold hover:underline"
						>
							View All Staff
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
					className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
				>
					{leaders.map((leader) => (
						<motion.div
							key={leader.name}
							variants={slideUp}
							className="text-center"
						>
							<div className="w-40 h-40 mx-auto rounded-full overflow-hidden mb-4 border-4 border-outline-variant/30">
								<img
									src={leader.image}
									alt={leader.name}
									className="w-full h-full object-cover"
									loading="lazy"
								/>
							</div>
							<h3 className="text-lg font-headline font-semibold text-primary">
								{leader.role}
							</h3>
							<p className="text-on-surface font-medium">{leader.name}</p>
							{leader.description && (
								<p className="text-on-surface-variant text-sm mt-2 max-w-xs mx-auto">
									{leader.description}
								</p>
							)}
						</motion.div>
					))}
				</motion.div>

				<AnimatePosition variants={slideUp} className="mt-12">
					<div className="bg-surface-container rounded-2xl p-8 max-w-2xl mx-auto flex items-start gap-4">
						<span className="material-symbols-outlined text-4xl text-secondary">
							work
						</span>
						<div>
							<h3 className="text-xl font-headline font-semibold text-primary mb-2">
								Join the Team
							</h3>
							<p className="text-on-surface-variant mb-3">
								We are always looking for passionate individuals to help us
								build the kingdom.
							</p>
							<button
								type="button"
								className="text-secondary font-semibold text-sm hover:underline"
							>
								Career Openings
							</button>
						</div>
					</div>
				</AnimatePosition>
			</div>
		</section>
	)
}
