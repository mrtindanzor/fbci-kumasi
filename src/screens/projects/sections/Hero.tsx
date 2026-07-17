import { BRANDING } from "@/shared/constants"
import { AnimatePosition, slideUp } from "@/shared/ui/Framer"

export function Hero() {
	return (
		<section className="relative flex items-center bg-linear-to-b from-primary via-primary/80 to-primary-container overflow-hidden">
			<div className="container-app relative z-10 py-8">
				<AnimatePosition variants={slideUp} className="max-w-2xl">
					<p className="text-secondary font-semibold text-sm uppercase tracking-wider mb-4">
						Community Impact
					</p>
					<h1 className="text-2xl md:text-4xl font-headline font-bold text-white leading-tight mb-4">
						Ongoing Missions & Projects
					</h1>
					<p className="text-neutral-400 max-w-lg">
						At {BRANDING.name}, our work extends beyond our walls. Join us in
						our journey of faith through active community service and
						sustainable global missions.
					</p>
				</AnimatePosition>
			</div>
		</section>
	)
}
