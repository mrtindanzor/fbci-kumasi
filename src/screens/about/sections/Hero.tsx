import { BRANDING } from "@/shared/constants"
import { AnimatePosition, slideInLeft, slideUp } from "@/shared/ui/Framer"
import { BackgroundImage } from "@/shared/ui/primitives/BackgroundImage"

export function Hero() {
	return (
		<section className="relative min-h-app-height pt-header-claim flex items-center bg-linear-to-br from-primary to-primary-container overflow-hidden">
			<BackgroundImage url="/images/church-side-2.avif" />

			<div className="container-app relative z-10 py-20">
				<AnimatePosition variants={slideInLeft} className="max-w-2xl">
					<h1 className="text-4xl md:text-6xl font-headline font-bold text-white leading-tight mb-6">
						Our Sanctuary of Shared Faith
					</h1>
				</AnimatePosition>

				<AnimatePosition variants={slideUp} className="max-w-2xl">
					<p className="text-lg text-white/80 max-w-lg">
						{BRANDING.name} has grown from a small family gathering into a
						vibrant community dedicated to the pursuit of truth, love, and
						spiritual maturity.
					</p>
				</AnimatePosition>
			</div>
		</section>
	)
}
