import { AnimatePosition, slideUp } from "@/shared/ui/Framer"
import { Button } from "@/shared/ui/primitives/button"

export function CallToAction() {
	return (
		<section className="section-gap bg-surface-container">
			<div className="container-app">
				<AnimatePosition variants={slideUp}>
					<div className="max-w-2xl mx-auto text-center">
						<h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-4">
							Take Your Next Step
						</h2>
						<p className="text-on-surface-variant mb-8">
							Whether you're looking for a new home or just curious about our
							beliefs, we'd love to connect with you.
						</p>
						<div className="flex flex-wrap justify-center gap-4 mb-10">
							<Button variant="primary" size="lg">
								Contact Us
							</Button>
							<Button variant="secondary" size="lg">
								Learn More
							</Button>
						</div>

						<div className="flex flex-wrap justify-center gap-6">
							<div className="flex items-center gap-3 text-on-surface-variant">
								<span className="material-symbols-outlined text-secondary">
									calendar_month
								</span>
								<div className="text-left">
									<p className="font-semibold text-primary text-sm">Visit Us</p>
									<p className="text-sm">Sunday 8am & 10:30am</p>
								</div>
							</div>
							<div className="flex items-center gap-3 text-on-surface-variant">
								<span className="material-symbols-outlined text-secondary">
									favorite
								</span>
								<div className="text-left">
									<p className="font-semibold text-primary text-sm">Give</p>
									<p className="text-sm">Support our mission</p>
								</div>
							</div>
						</div>
					</div>
				</AnimatePosition>
			</div>
		</section>
	)
}
