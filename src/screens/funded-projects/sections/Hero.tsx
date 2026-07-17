import { AnimatePosition, slideInLeft, slideUp } from "@/shared/ui/Framer"

export function Hero() {
	return (
		<section className="relative min-h-[60vh] flex items-center bg-linear-to-br from-primary to-primary-container overflow-hidden">
			<div className="absolute inset-0 opacity-40">
				<div className="absolute inset-0 bg-[url('/images/church-side-2.avif')] bg-cover bg-center" />
			</div>

			<div className="container-app relative z-10 py-20">
				<AnimatePosition variants={slideInLeft} className="max-w-2xl">
					<span className="text-secondary font-label text-sm tracking-widest uppercase mb-4 block">
						Victory through Faith
					</span>
					<h1 className="text-4xl md:text-6xl font-headline font-bold text-white leading-tight mb-6">
						Our Funded Missions
					</h1>
				</AnimatePosition>

				<AnimatePosition variants={slideUp} className="max-w-2xl">
					<p className="text-lg text-white/80 max-w-lg">
						Witness the power of collective faith. Through your generous
						support, these vital ministry projects have been fully funded and
						are actively transforming lives across West Africa.
					</p>
				</AnimatePosition>
			</div>
		</section>
	)
}
