import { BRANDING } from "@/shared/constants"
import { AnimatePosition, slideUp } from "@/shared/ui/Framer"

export function Hero() {
	return (
		<section className="relative min-h-[400px] flex items-center bg-gradient-to-br from-primary to-primary-container overflow-hidden">
			<div className="container-app relative z-10 py-20">
				<AnimatePosition variants={slideUp} className="max-w-2xl">
					<h1 className="text-4xl md:text-6xl font-headline font-bold text-white leading-tight mb-4">
						Our Ministries
					</h1>
					<p className="text-lg text-white/80 max-w-lg">
						Discover the heartbeat of {BRANDING.name}. From education to global
						outreach, we are committed to spreading wisdom and providing
						sanctuary through every medium.
					</p>
				</AnimatePosition>
			</div>
		</section>
	)
}
