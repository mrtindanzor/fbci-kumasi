import { BRANDING } from "@/shared/constants"
import { AnimatePosition, slideUp } from "@/shared/ui/Framer"

export function Hero() {
	return (
		<section className="relative min-h-[500px] flex items-center bg-gradient-to-br from-primary to-primary-container overflow-hidden">
			<div className="absolute inset-0 opacity-15">
				<div className="absolute inset-0 bg-[url('https://picsum.photos/seed/about-hero/1920/1080')] bg-cover bg-center" />
			</div>

			<div className="container-app relative z-10 py-20">
				<AnimatePosition variants={slideUp} className="max-w-2xl">
					<h1 className="text-4xl md:text-6xl font-headline font-bold text-white leading-tight mb-6">
						Our Sanctuary of Shared Faith
					</h1>
					<p className="text-lg text-white/80 max-w-lg">
						Established in 1984, {BRANDING.name} has grown from a small family
						gathering into a vibrant community dedicated to the pursuit of
						truth, love, and spiritual maturity.
					</p>
				</AnimatePosition>
			</div>
		</section>
	)
}
