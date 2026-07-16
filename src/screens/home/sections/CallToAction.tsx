import { routes } from "@/shared/routes"
import { AnimatePosition, slideUp } from "@/shared/ui/Framer"
import { Link } from "@/shared/ui/primitives/button"

export function CallToAction() {
	return (
		<section className="section-gap">
			<div className="container-app">
				<AnimatePosition variants={slideUp}>
					<div className="bg-primary rounded-3xl p-10 md:p-16 text-center">
						<h2 className="text-3xl md:text-4xl font-headline font-bold text-white mb-4">
							Ready to Connect?
						</h2>
						<p className="text-white/80 max-w-xl mx-auto mb-8">
							Whether you're visiting for the first time or looking to get more
							involved, we have a place for you. Join a community that cares.
						</p>
						<div className="flex flex-wrap justify-center gap-4">
							<Link
								href={routes.contact}
								variant="gold"
								size="lg"
								className="border-white text-white hover:bg-white hover:text-primary"
							>
								Contact Us
								<span className="material-symbols-outlined text-lg">
									arrow_forward
								</span>
							</Link>
						</div>
					</div>
				</AnimatePosition>
			</div>
		</section>
	)
}
