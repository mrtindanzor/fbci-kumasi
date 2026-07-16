import { AnimatePosition, slideUp } from "@/shared/ui/Framer"
import { Button } from "@/shared/ui/primitives/button"

export function Hero() {
	return (
		<section className="relative min-h-[600px] md:min-h-[700px] flex items-center bg-gradient-to-br from-primary to-primary-container overflow-hidden">
			<div className="absolute inset-0 opacity-20">
				<div className="absolute inset-0 bg-[url('https://picsum.photos/seed/church-hero/1920/1080')] bg-cover bg-center" />
			</div>

			<div className="container-app relative z-10 py-20">
				<AnimatePosition variants={slideUp} className="max-w-2xl">
					<p className="text-secondary font-semibold text-sm tracking-wider uppercase mb-4">
						Welcome Home
					</p>
					<h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-bold text-white leading-tight mb-6">
						Welcome to Your Spiritual Home
					</h1>
					<p className="text-lg text-white/80 mb-8 max-w-lg">
						Join Us This Sunday for a transformative experience of worship,
						community, and word. We believe in creating a modern sanctuary for
						all generations.
					</p>
					<div className="flex flex-wrap gap-4">
						<Button variant="gold" size="lg">
							Projects
						</Button>
						<Button
							variant="secondary"
							size="lg"
							className="border-white text-white hover:bg-white hover:text-primary"
						>
							New Here?
						</Button>
					</div>
				</AnimatePosition>
			</div>
		</section>
	)
}
