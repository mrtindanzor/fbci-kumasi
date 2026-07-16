import { AnimatePosition, slideUp } from "@/shared/ui/Framer"
import { Button } from "@/shared/ui/primitives/button"

const highlights = [
	{
		title: "Akropong Health Center",
		description:
			"Established in 2015, providing essential medical care to over 10,000 residents annually.",
	},
	{
		title: "Digital Literacy Initiative",
		description:
			"Empowering the next generation with technology labs in three regional schools.",
	},
	{
		title: "The Well Project",
		description:
			"Over 50 clean water wells commissioned across the Ashanti region since 2012.",
	},
]

export function Highlights() {
	return (
		<section className="section-gap">
			<div className="container-app">
				<AnimatePosition variants={slideUp}>
					<h2 className="text-3xl md:text-4xl font-headline font-bold text-primary text-center mb-4">
						Heart for Africa
					</h2>
					<p className="text-on-surface-variant text-center max-w-xl mx-auto mb-12">
						Ghana Ministry Highlights
					</p>
				</AnimatePosition>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
					{highlights.map((item) => (
						<AnimatePosition key={item.title} variants={slideUp}>
							<div className="bg-surface-container rounded-2xl p-6 border border-outline-variant/30">
								<h3 className="text-lg font-headline font-semibold text-primary mb-2">
									{item.title}
								</h3>
								<p className="text-on-surface-variant text-sm leading-relaxed">
									{item.description}
								</p>
							</div>
						</AnimatePosition>
					))}
				</div>

				<AnimatePosition variants={slideUp} className="text-center">
					<p className="text-on-surface-variant max-w-xl mx-auto mb-6">
						Support the Vision - Join Pastor Anderson in his ongoing mission to
						bring healing and hope to communities around the world.
					</p>
					<div className="flex justify-center gap-4">
						<Button variant="primary">Donate to Missions</Button>
						<Button variant="secondary">Volunteer</Button>
					</div>
				</AnimatePosition>
			</div>
		</section>
	)
}
