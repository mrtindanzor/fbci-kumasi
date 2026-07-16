import { AnimatePosition, slideUp } from "@/shared/ui/Framer"

export function PodcastPlayer() {
	return (
		<section className="section-gap bg-primary-container text-white">
			<div className="container-app">
				<AnimatePosition variants={slideUp}>
					<div className="max-w-3xl mx-auto">
						<div className="flex items-center justify-center gap-6 mb-8">
							<button
								type="button"
								className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
							>
								<span className="material-symbols-outlined text-2xl">
									skip_previous
								</span>
							</button>
							<button
								type="button"
								className="h-16 w-16 rounded-full bg-white flex items-center justify-center hover:bg-white/90 transition-colors"
							>
								<span className="material-symbols-outlined text-3xl text-primary">
									play_arrow
								</span>
							</button>
							<button
								type="button"
								className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
							>
								<span className="material-symbols-outlined text-2xl">
									skip_next
								</span>
							</button>
						</div>
						<div className="flex items-center justify-between text-sm text-white/60">
							<span>00:00</span>
							<span>24:15</span>
						</div>
						<div className="w-full h-1 bg-white/20 rounded-full mt-2">
							<div className="h-full w-0 bg-secondary rounded-full" />
						</div>
					</div>
				</AnimatePosition>
			</div>
		</section>
	)
}
