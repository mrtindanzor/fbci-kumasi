import { AnimatePosition, slideUp } from "@/shared/ui/Framer"
import { Button } from "@/shared/ui/primitives/button"
import { conferenceData } from "../data"

export function Hero() {
	return (
		<section className="relative min-h-app-height  pt-header-claim flex items-center bg-linear-to-br from-primary to-primary-container overflow-hidden">
			<div className="container-app relative z-10 py-20">
				<AnimatePosition variants={slideUp} className="max-w-2xl">
					<p className="text-secondary text-sm uppercase tracking-wider mb-4 bg-neutral-200 w-fit px-4 py-1.5 font-bold rounded-xl">
						Upcoming Conference
					</p>
					<h1 className="text-4xl md:text-6xl font-headline font-bold text-white leading-tight mb-6">
						{conferenceData.title}
					</h1>
					<p className="text-neutral-400 text-sm whitespace-pre-wrap max-w-lg mb-8">
						{conferenceData.description}
					</p>
					<div className="flex *:tracking-tight flex-wrap gap-4">
						<Button variant="gold" size="lg">
							Register Now
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
