import { BRANDING } from "@/shared/constants"
import { AnimatePosition, slideUp } from "@/shared/ui/Framer"

export function Journey() {
	return (
		<section className="section-gap">
			<div className="container-app">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
					<AnimatePosition variants={slideUp}>
						<div>
							<h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-2">
								Our Journey
							</h2>
							<p className="text-secondary font-semibold text-sm uppercase tracking-wider mb-6">
								The Legacy of House Anderson
							</p>
							<p className="text-on-surface-variant leading-relaxed mb-4">
								{BRANDING.name} began in the heart of the city with a simple
								vision: to create a space where modern life and ancient wisdom
								coexist. What started as a collective of seven families has
								flourished into a multi-generational sanctuary for thousands.
							</p>
							<p className="text-on-surface-variant leading-relaxed">
								Our name reflects our identity—a "House" where everyone is
								family, and "Anderson" symbolizing our deep roots in the local
								community. We believe in building bridges across cultures and
								generations through the power of fellowship and teaching.
							</p>
						</div>
					</AnimatePosition>

					<AnimatePosition variants={slideUp}>
						<div className="bg-surface-container rounded-3xl p-10 text-center">
							<p className="text-5xl md:text-6xl font-headline font-bold text-primary">
								40
							</p>
							<p className="text-lg text-on-surface-variant mt-2">Years</p>
							<p className="text-secondary font-medium mt-1">
								Of Community Faithfulness
							</p>
						</div>
					</AnimatePosition>
				</div>
			</div>
		</section>
	)
}
