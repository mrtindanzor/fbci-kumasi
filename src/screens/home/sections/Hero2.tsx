import { BRANDING } from "@/shared/constants"
import { routes } from "@/shared/routes/routes"
import { AnimatePosition, motionVariants } from "@/shared/ui/Framer"
import { Link } from "@/shared/ui/primitives/button"

export function Hero() {
	return (
		<section className="relative w-full h-app-height">
			<div className="absolute inset-0">
				<div className="absolute inset-0 bg-[url('/images/church-side-1.avif')] bg-cover bg-center" />
			</div>
			<div className="absolute inset-0 bg-linear-to-b from-primary/60 via-primary/40 to-primary/80" />
			<div className="relative z-10 flex flex-col items-center justify-center h-full px-margin-mobile md:px-margin-desktop text-center">
				<AnimatePosition
					variants={motionVariants({
						hidden: { opacity: 0, y: 30 },
						show: { opacity: 1, y: 0 },
					})}
				>
					<h1 className="font-h1 text-h1 md:text-[4rem] mx-auto max-w-4xl text-white drop-shadow-lg">
						Welcome to {BRANDING.name}
					</h1>
					<p className="mt-md text-h5 md:text-h4 text-white/90 font-body">
						{BRANDING.tagline}
					</p>
					<div className="mt-10 flex flex-col sm:flex-row gap-md justify-center">
						<Link
							href={routes.contact}
							variant="gold"
							size="lg"
							className="font-label"
						>
							Contact Us
						</Link>
					</div>
				</AnimatePosition>
			</div>
		</section>
	)
}
