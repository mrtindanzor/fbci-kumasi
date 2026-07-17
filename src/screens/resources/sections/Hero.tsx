import { routes } from "@/shared/routes"
import { AnimatePosition, slideInLeft, slideUp } from "@/shared/ui/Framer"
import { Link } from "@/shared/ui/primitives/button"

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
						Resources
					</h1>
				</AnimatePosition>

				<AnimatePosition variants={slideUp} className="max-w-2xl">
					<p className="text-lg text-white/80 max-w-lg">
						Here are some resources provided free by our church for you. If any
						of these downloads help you in any way, we'd love to know. Also, if
						you have questions or experience any problems downloading any of
						these resources, feel free to{" "}
						<Link
							href={routes.contact}
							variant="none"
							size="none"
							className="underline"
						>
							contact us
						</Link>
						.
					</p>
				</AnimatePosition>
			</div>
		</section>
	)
}
