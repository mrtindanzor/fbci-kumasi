import { BRANDING } from "@/shared/constants"
import { AnimatePosition, slideUp } from "@/shared/ui/Framer"

export function Hero() {
	return (
		<section className="relative min-h-[400px] flex items-center bg-gradient-to-br from-primary to-primary-container overflow-hidden">
			<div className="container-app relative z-10 py-20">
				<AnimatePosition variants={slideUp} className="max-w-2xl">
					<p className="text-secondary font-semibold text-sm uppercase tracking-wider mb-4">
						Community Impact
					</p>
					<h1 className="text-4xl md:text-6xl font-headline font-bold text-white leading-tight mb-4">
						Ongoing Missions & Projects
					</h1>
					<p className="text-lg text-white/80 max-w-lg">
						At {BRANDING.name}, our work extends beyond our walls. Join us in
						our journey of faith through active community service and
						sustainable global missions.
					</p>
				</AnimatePosition>
			</div>
		</section>
	)
}
