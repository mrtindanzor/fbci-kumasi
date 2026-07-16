import { AnimatePosition, slideUp } from "@/shared/ui/Framer"
import { Button } from "@/shared/ui/primitives/button"

export function InformationCentre() {
	return (
		<section className="section-gap">
			<div className="container-app">
				<AnimatePosition variants={slideUp}>
					<div className="bg-surface-container rounded-2xl p-10 md:p-16 text-center">
						<span className="material-symbols-outlined text-5xl text-secondary mb-4 block">
							info
						</span>
						<h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-4">
							Information Centre
						</h2>
						<p className="text-on-surface-variant max-w-xl mx-auto mb-8">
							A hub for resources, guidance, and community connection. Our
							center provides immediate support and answers to those seeking
							spiritual growth or assistance.
						</p>
						<Button variant="primary" size="lg">
							Visit Us
						</Button>
					</div>
				</AnimatePosition>
			</div>
		</section>
	)
}
