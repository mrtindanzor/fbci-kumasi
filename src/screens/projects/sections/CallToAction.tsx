import { AnimatePosition, slideUp } from "@/shared/ui/Framer"

export function CallToAction() {
	return (
		<section className="section-gap">
			<div className="container-app">
				<AnimatePosition variants={slideUp}>
					<div className="bg-surface-container rounded-2xl p-10 md:p-16 text-center">
						<span className="material-symbols-outlined text-5xl text-secondary mb-4 block">
							history
						</span>
						<h2 className="text-2xl md:text-3xl font-headline font-bold text-primary mb-4">
							Want to see the impact of your previous gifts?
						</h2>
						<p className="text-on-surface-variant max-w-xl mx-auto mb-8">
							Transparency is the cornerstone of our community. Explore the
							history of our successful missions and see how lives have been
							transformed.
						</p>
						<button
							type="button"
							className="inline-flex items-center gap-2 text-secondary font-semibold hover:underline"
						>
							View Funded Projects
							<span className="material-symbols-outlined text-lg">
								arrow_forward
							</span>
						</button>
					</div>
				</AnimatePosition>
			</div>
		</section>
	)
}
