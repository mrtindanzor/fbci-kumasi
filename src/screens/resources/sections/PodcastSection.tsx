import { AnimatePosition, slideUp } from "@/shared/ui/Framer"

export function PodcastSection() {
	return (
		<section className="section-gap">
			<div className="container-app">
				<AnimatePosition variants={slideUp}>
					<div className="max-w-2xl mx-auto">
						<h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-2">
							Featured Podcast
						</h2>
						<p className="text-on-surface-variant mb-8">
							Foundation for the Faith: Weekly Insights — Join Pastor as he
							dives deep into the scriptures.
						</p>

						<div className="bg-surface-container rounded-2xl p-6 border border-outline-variant">
							<div className="flex items-start gap-4">
								<button
									type="button"
									className="shrink-0 size-14 rounded-full bg-secondary text-white flex items-center justify-center hover:bg-secondary/90 transition-colors"
								>
									<span className="material-symbols-outlined text-2xl">
										play_arrow
									</span>
								</button>

								<div className="flex-1 min-w-0">
									<div className="flex items-center gap-3 text-sm text-on-surface-variant mb-1">
										<span>12:45</span>
										<span className="text-secondary font-semibold">42:10</span>
									</div>
									<h3 className="font-headline font-semibold text-primary">
										Episode 142: The Authority of the Word
									</h3>
									<p className="text-sm text-on-surface-variant">
										— Released June 12, 2024
									</p>
								</div>

								<span className="material-symbols-outlined text-on-surface-variant">
									volume_up
								</span>
							</div>
						</div>
					</div>
				</AnimatePosition>
			</div>
		</section>
	)
}
