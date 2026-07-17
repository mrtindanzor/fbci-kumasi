import { BRANDING } from "@/shared/constants"
import { AnimatePosition, slideInLeft, slideInRight } from "@/shared/ui/Framer"

export function Hero() {
	return (
		<section className="relative min-h-100 flex items-center bg-linear-to-br from-primary to-primary-container overflow-hidden">
			<div className="container-app relative z-10 py-20">
				<AnimatePosition variants={slideInLeft} className="max-w-2xl">
					<h1 className="text-4xl md:text-6xl font-headline font-bold text-white leading-tight mb-4">
						Our Ministries
					</h1>
				</AnimatePosition>

				<AnimatePosition variants={slideInRight} className="max-w-2xl">
					<p className="text-neutral-300/80 max-w-lg">
						Discover the heartbeat of {BRANDING.name}. From education to global
						outreach, we are committed to spreading wisdom and providing
						sanctuary through every medium.
					</p>
				</AnimatePosition>
			</div>
		</section>
	)
}
