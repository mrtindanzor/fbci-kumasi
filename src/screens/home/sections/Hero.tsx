import { routes } from "@/shared/routes"
import { AnimatePosition, slideUp } from "@/shared/ui/Framer"
import { Link } from "@/shared/ui/primitives/button"

export function Hero() {
	return (
		<section className="relative min-h-150 md:min-h-175 flex items-center bg-linear-to-br from-primary to-primary-container overflow-hidden">
			<div className="absolute inset-0 opacity-40">
				<div className="absolute inset-0 bg-[url('/images/church-side-1.avif')] bg-cover bg-center" />
			</div>

			<div className="container-app relative flex flex-col items-center text-center z-10 py-20">
				<AnimatePosition variants={slideUp} className="max-w-2xl">
					<h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-bold text-white leading-tight mb-6">
						Welcome
					</h1>
					<p className="text-lg text-white/80 mb-8 max-w-lg">
						Join Us This Sunday for a transformative experience of worship,
						community, and word. We believe in creating a modern sanctuary for
						all generations.
					</p>
					<Link
						href={routes.contact}
						className="md:w-70 border border-neutral-50"
						variant="gold"
						size="lg"
					>
						Contact Us
					</Link>
				</AnimatePosition>
			</div>
		</section>
	)
}
