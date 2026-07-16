import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
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
	const [current, setCurrent] = useState(0)

	function prev() {
		setCurrent((c) => (c === 0 ? highlights.length - 1 : c - 1))
	}

	function next() {
		setCurrent((c) => (c === highlights.length - 1 ? 0 : c + 1))
	}

	return (
		<section className="section-gap">
			<div className="container-app">
				<AnimatePosition variants={slideUp}>
					<div className="flex items-center justify-between mb-12">
						<div>
							<h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">
								Heart for Africa
							</h2>
						</div>
						<div className="flex gap-2">
							<button
								type="button"
								onClick={prev}
								className="h-10 w-10 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface-container transition-colors"
							>
								<span className="material-symbols-outlined">chevron_left</span>
							</button>
							<button
								type="button"
								onClick={next}
								className="h-10 w-10 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface-container transition-colors"
							>
								<span className="material-symbols-outlined">chevron_right</span>
							</button>
						</div>
					</div>
				</AnimatePosition>

				<div className="relative overflow-hidden max-w-4xl mx-auto mb-12">
					<AnimatePresence mode="wait">
						<motion.div
							key={current}
							initial={{ opacity: 0, x: 50 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -50 }}
							transition={{ duration: 0.3 }}
							className="bg-surface-container rounded-2xl p-8 border border-outline-variant/30"
						>
							<h3 className="text-xl font-headline font-semibold text-primary mb-3">
								{highlights[current].title}
							</h3>
							<p className="text-on-surface-variant leading-relaxed">
								{highlights[current].description}
							</p>
						</motion.div>
					</AnimatePresence>
				</div>

				<AnimatePosition variants={slideUp} className="text-center">
					<p className="text-on-surface-variant max-w-xl mx-auto mb-6">
						Support the Vision — Join Pastor Anderson in his ongoing mission to
						bring healing and hope to communities around the world. Your
						partnership makes these stories possible.
					</p>
					<div className="flex justify-center gap-4 mb-6">
						<Button variant="primary">Donate to Missions</Button>
						<Button variant="secondary">Volunteer</Button>
					</div>
					<div className="inline-flex items-center gap-2 bg-surface-container rounded-xl px-5 py-3 border border-outline-variant/30">
						<span className="material-symbols-outlined text-secondary">
							verified
						</span>
						<div className="text-left">
							<p className="text-xs text-on-surface-variant">
								FBMI Verified — Official Partnership Profile
							</p>
							<button
								type="button"
								className="text-sm text-secondary font-semibold hover:underline"
							>
								Visit Profile
							</button>
						</div>
					</div>
				</AnimatePosition>
			</div>
		</section>
	)
}
