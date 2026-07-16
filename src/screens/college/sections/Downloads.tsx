import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { AnimatePosition, slideUp } from "@/shared/ui/Framer"
import { collegeResources } from "../data"

export function Downloads() {
	const [current, setCurrent] = useState(0)

	function prev() {
		setCurrent((c) => (c === 0 ? collegeResources.length - 1 : c - 1))
	}

	function next() {
		setCurrent((c) => (c === collegeResources.length - 1 ? 0 : c + 1))
	}

	return (
		<section className="section-gap bg-surface-container">
			<div className="container-app">
				<AnimatePosition variants={slideUp}>
					<div className="flex items-center justify-between mb-12">
						<div>
							<h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">
								Institutional Resources
							</h2>
						</div>
						<div className="flex gap-2">
							<button
								type="button"
								onClick={prev}
								className="h-10 w-10 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface transition-colors"
							>
								<span className="material-symbols-outlined">chevron_left</span>
							</button>
							<button
								type="button"
								onClick={next}
								className="h-10 w-10 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface transition-colors"
							>
								<span className="material-symbols-outlined">chevron_right</span>
							</button>
						</div>
					</div>
				</AnimatePosition>

				<div className="relative overflow-hidden max-w-4xl mx-auto">
					<AnimatePresence mode="wait">
						<motion.div
							key={current}
							initial={{ opacity: 0, x: 50 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -50 }}
							transition={{ duration: 0.3 }}
							className="bg-surface rounded-2xl p-8 border border-outline-variant/30"
						>
							<div className="flex items-start justify-between">
								<div className="flex items-start gap-4">
									<span className="material-symbols-outlined text-3xl text-secondary">
										visibility
									</span>
									<div>
										<p className="text-sm text-on-surface-variant">
											{collegeResources[current].format} •{" "}
											{collegeResources[current].size}
										</p>
										<h3 className="text-lg font-headline font-semibold text-primary mt-1">
											{collegeResources[current].description}
										</h3>
										<p className="text-on-surface-variant text-sm mt-1">
											{collegeResources[current].title}
										</p>
									</div>
								</div>
								<div className="flex gap-2">
									<button
										type="button"
										className="h-10 w-10 rounded-lg bg-surface-container border border-outline-variant flex items-center justify-center hover:bg-surface-container-high transition-colors"
									>
										<span className="material-symbols-outlined text-lg text-on-surface-variant">
											visibility
										</span>
									</button>
									<button
										type="button"
										className="h-10 w-10 rounded-lg bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-colors"
									>
										<span className="material-symbols-outlined text-lg">
											download
										</span>
									</button>
								</div>
							</div>
						</motion.div>
					</AnimatePresence>
				</div>
			</div>
		</section>
	)
}
