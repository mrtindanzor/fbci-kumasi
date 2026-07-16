import { AnimatePosition, slideUp } from "@/shared/ui/Framer"
import { Button } from "@/shared/ui/primitives/button"

export function CallToAction() {
	return (
		<section className="section-gap">
			<div className="container-app">
				<AnimatePosition variants={slideUp}>
					<div className="bg-primary rounded-3xl p-10 md:p-16 text-center">
						<h2 className="text-3xl md:text-4xl font-headline font-bold text-white mb-8">
							Ready to start your journey?
						</h2>
						<div className="flex flex-wrap justify-center gap-4">
							<Button variant="gold" size="lg">
								Apply Now
								<span className="material-symbols-outlined text-lg">
									arrow_forward
								</span>
							</Button>
							<Button
								variant="secondary"
								size="lg"
								className="border-white text-white hover:bg-white hover:text-primary"
							>
								Speak to Admissions
							</Button>
						</div>
					</div>
				</AnimatePosition>
			</div>
		</section>
	)
}
