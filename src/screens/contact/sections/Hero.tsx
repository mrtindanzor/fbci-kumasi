import { AnimatePosition, slideInLeft, slideUp } from "@/shared/ui/Framer"

export function Hero() {
	return (
		<section className="relative min-h-[50vh] flex items-center bg-linear-to-br from-primary to-primary-container overflow-hidden">
			<div className="absolute inset-0 opacity-40">
				<div className="absolute inset-0 bg-[url('/images/church-side-2.avif')] bg-cover bg-center" />
			</div>

			<div className="container-app relative z-10 py-20">
				<AnimatePosition variants={slideInLeft}>
					<h1 className="text-4xl md:text-6xl font-headline font-bold text-white leading-tight mb-4">
						Get In Touch
					</h1>
				</AnimatePosition>

				<AnimatePosition variants={slideUp} className="max-w-xl">
					<p className="text-lg text-white/80">
						Connecting Our Community Through Faith. Whether you have a question
						about our services, want to learn more about HACWA, or need
						spiritual guidance, we are here for you.
					</p>
				</AnimatePosition>
			</div>
		</section>
	)
}
