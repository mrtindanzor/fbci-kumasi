import { AnimatePosition, slideUp } from "@/shared/ui/Framer"
import { Link } from "@/shared/ui/primitives/button"

const sources = [
	"https://www.podbean.com/player-v2/?i=zstd8-2604e7-pbblog-playlist&share=1&download=1&rtl=0&fonts=Arial&skin=1&font-color=auto&logo_link=episode_page&order=episodic&limit=10&filter=all&ss=a713390a017602015775e868a2cf26b0&btn-skin=7&size=315",
] as const

export function OnDemand() {
	return (
		<section className="section-gap bg-primary-container text-white">
			<div className="container-app">
				<AnimatePosition variants={slideUp}>
					<div className="flex items-center justify-between mb-8">
						<div>
							<h2 className="text-3xl md:text-4xl font-headline font-bold text-white capitalize mb-2">
								Listen to our Pastor's most recent messages
							</h2>
							<p className="text-white/70">Latest Sermons & Podcasts</p>
						</div>
						<Link
							href="https://tedspeer.podbean.com/"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 text-secondary font-semibold hover:underline"
						>
							View Full Library
						</Link>
					</div>

					<p className="text-white/70 max-w-2xl mb-8">
						You can listen here or go to Podbean
					</p>
					<Player src={sources[0]} />
				</AnimatePosition>
			</div>
		</section>
	)
}

type PlayerProps = { src: string }
function Player({ src }: PlayerProps) {
	return (
		<iframe
			title="Podbean Player"
			src={src}
			width="100%"
			height="315"
			allowFullScreen
		/>
	)
}
