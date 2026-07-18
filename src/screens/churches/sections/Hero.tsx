import { AnimatePosition, slideInLeft, slideUp } from "@/shared/ui/Framer"
import { BackgroundImage } from "@/shared/ui/primitives/BackgroundImage"

export function Hero() {
	return (
		<section className="relative min-h-[50vh] pt-header-claim flex items-center bg-linear-to-br from-primary to-primary-container overflow-hidden">
			<BackgroundImage url="/images/churches-bg.jpg" />

			<div className="container-app relative z-10 py-20">
				<AnimatePosition variants={slideInLeft}>
					<h1 className="text-4xl md:text-6xl font-headline font-bold text-white leading-tight mb-4">
						Churches Pastored by HACWA Graduates
					</h1>
				</AnimatePosition>

				<AnimatePosition variants={slideUp} className="max-w-xl">
					<p className="text-lg text-white/80">
						A directory of faithful ministries led by alumni of Hyles-Anderson
						College of West Africa, spreading the gospel across the region.
					</p>
				</AnimatePosition>
			</div>
		</section>
	)
}
