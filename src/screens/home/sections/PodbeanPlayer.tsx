import { AnimatePosition, slideUp } from "@/shared/ui/Framer"

export function PodbeanPlayer() {
	return (
		<section className="section-gap bg-surface">
			<div className="container-app">
				<AnimatePosition variants={slideUp}>
					<div className="text-center mb-10">
						<h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-3">
							Featured Message
						</h2>
						<p className="text-on-surface-variant max-w-xl mx-auto">
							Walking in the Light of Wisdom
						</p>
					</div>

					<div className="max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg">
						<iframe
							src="https://playlist.podbean.com/houseanderson/playlist.htm"
							width="100%"
							height="300"
							frameBorder="0"
							scrolling="no"
							className="w-full"
							title="Podbean Playlist"
						/>
					</div>
				</AnimatePosition>
			</div>
		</section>
	)
}
