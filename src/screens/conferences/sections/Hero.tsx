import { AnimatePosition, slideUp } from "@/shared/ui/Framer"
import { Image } from "@/shared/ui/primitives/Image"
import { conference } from "../data"

export function Hero() {
	return (
		<section className="relative min-h-[70vh] pt-header-claim flex items-center bg-background overflow-hidden">
			<div className="container-app relative z-10 py-20">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
					<AnimatePosition variants={slideUp}>
						<span className="inline-block bg-secondary-container text-on-secondary px-4 py-1.5 rounded-full text-sm font-semibold uppercase tracking-wider mb-6">
							Annual Conference
						</span>

						<h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold text-primary leading-tight mb-6">
							{conference.title}
						</h1>

						<p className="text-lg text-on-surface-variant max-w-lg leading-relaxed">
							{conference.subtitle}
						</p>
					</AnimatePosition>

					<AnimatePosition variants={slideUp}>
						<div className="relative mx-auto lg:mx-0 max-w-md lg:max-w-none">
							<div className="rounded-2xl overflow-hidden shadow-xl border border-outline-variant/30">
								<Image
									src={conference.poster}
									alt={conference.title}
									className="w-full h-auto object-cover"
								/>
							</div>
							<div className="absolute -inset-4 bg-secondary/10 rounded-3xl -z-10" />
						</div>
					</AnimatePosition>
				</div>
			</div>
		</section>
	)
}
