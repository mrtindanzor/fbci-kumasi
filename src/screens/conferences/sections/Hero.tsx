import { AnimatePosition, slideUp } from "@/shared/ui/Framer"
import { Button } from "@/shared/ui/primitives/button"
import { conferenceData } from "../data"

export function Hero() {
	return (
		<section className="relative min-h-[500px] flex items-center bg-gradient-to-br from-primary to-primary-container overflow-hidden">
			<div className="absolute inset-0 opacity-15">
				<div className="absolute inset-0 bg-[url('https://picsum.photos/seed/conference-hero/1920/1080')] bg-cover bg-center" />
			</div>

			<div className="container-app relative z-10 py-20">
				<AnimatePosition variants={slideUp} className="max-w-2xl">
					<p className="text-secondary font-semibold text-sm uppercase tracking-wider mb-4">
						Upcoming Conference
					</p>
					<h1 className="text-4xl md:text-6xl font-headline font-bold text-white leading-tight mb-6">
						{conferenceData.title}
					</h1>
					<p className="text-lg text-white/80 max-w-lg mb-8">
						{conferenceData.description}
					</p>
					<div className="flex flex-wrap gap-4">
						<Button variant="gold" size="lg">
							Register Now
							<span className="material-symbols-outlined text-lg">
								arrow_forward
							</span>
						</Button>
						<Button
							variant="secondary"
							size="lg"
							className="border-white text-white hover:bg-white hover:text-primary"
						>
							View Schedule
						</Button>
					</div>
				</AnimatePosition>
			</div>
		</section>
	)
}
