import { AnimatePosition, slideInLeft, slideUp } from "@/shared/ui/Framer"

export function Hero() {
	return (
		<section className="relative min-h-[60vh] pt-header-claim flex items-center bg-linear-to-br from-primary to-primary-container overflow-hidden">
			<div className="absolute inset-0 opacity-40">
				<div className="absolute inset-0 bg-[url('/images/church-side-2.avif')] bg-cover bg-center" />
			</div>

			<div className="container-app relative z-10 py-20">
				<AnimatePosition variants={slideInLeft}>
					<span className="text-secondary bg-neutral-50 rounded-xl w-fit font-bold px-4 py-1.5 font-label text-sm tracking-widest uppercase mb-4 block">
						Knowledge & Spirit
					</span>
					<h1 className="text-4xl md:text-6xl font-headline font-bold text-white leading-tight mb-6 max-w-2xl">
						Resources for Growth
					</h1>
				</AnimatePosition>

				<AnimatePosition variants={slideUp} className="max-w-2xl">
					<p className="text-lg text-white/80 max-w-lg">
						Access our extensive library of sermons, educational materials, and
						spiritual music designed to support your walk with Christ.
					</p>
				</AnimatePosition>
			</div>
		</section>
	)
}
