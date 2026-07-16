import { AnimatePosition, slideUp } from "@/shared/ui/Framer"

export function OnDemand() {
	return (
		<section className="section-gap bg-primary-container text-white">
			<div className="container-app">
				<AnimatePosition variants={slideUp}>
					<div className="flex items-center justify-between mb-8">
						<div>
							<h2 className="text-3xl md:text-4xl font-headline font-bold text-white mb-2">
								On Demand
							</h2>
							<p className="text-white/70">Latest Sermons & Podcasts</p>
						</div>
						<button
							type="button"
							className="inline-flex items-center gap-2 text-secondary font-semibold hover:underline"
						>
							View Full Library
						</button>
					</div>

					<p className="text-white/70 max-w-2xl mb-8">
						Can't make it to a service? Listen to the Word wherever you are. Our
						digital library is updated weekly with messages of hope and wisdom.
					</p>
				</AnimatePosition>
			</div>
		</section>
	)
}
