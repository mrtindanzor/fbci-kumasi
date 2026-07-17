import { AnimatePosition, slideUp } from "@/shared/ui/Framer"
import { Button } from "@/shared/ui/primitives/button"

export function Hero() {
	return (
		<section className="relative min-h-app-height pt-header-claim flex items-center bg-linear-to-br from-primary to-primary-container overflow-hidden">
			<div className="container-app relative z-10 py-20">
				<AnimatePosition variants={slideUp} className="max-w-2xl">
					<div className="flex items-center gap-3 mb-6">
						<span className="material-symbols-outlined text-4xl text-white">
							school
						</span>
						<div>
							<p className="text-white font-headline font-semibold text-lg">
								House Anderson
							</p>
							<p className="text-white/70 text-sm uppercase tracking-wider">
								COLLEGE OF WEST AFRICA
							</p>
						</div>
					</div>
					<div className="flex flex-wrap gap-4">
						<Button variant="gold" size="lg">
							Explore Courses
						</Button>
						<Button
							variant="secondary"
							size="lg"
							className="border-white text-white hover:bg-white hover:text-primary"
						>
							Apply Now
						</Button>
					</div>
				</AnimatePosition>
			</div>
		</section>
	)
}
