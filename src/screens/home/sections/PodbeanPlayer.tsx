import { AnimatePosition, slideUp } from "@/shared/ui/Framer"

export function PodbeanPlayer() {
	return (
		<section className="section-gap bg-surface">
			<div className="container-app">
				<AnimatePosition variants={slideUp}>
					<div className="flex items-center gap-4 mb-6">
						<span className="material-symbols-outlined text-5xl text-secondary">
							play_arrow
						</span>
						<div>
							<h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">
								Featured Message
							</h2>
							<p className="text-on-surface-variant">
								Walking in the Light of Wisdom
							</p>
						</div>
					</div>
				</AnimatePosition>
			</div>
		</section>
	)
}
