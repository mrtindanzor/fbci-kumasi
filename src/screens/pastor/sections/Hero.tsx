import { CHURCH_INFO } from "@/shared/db"
import { routes } from "@/shared/routes"
import { AnimatePosition, slideUp } from "@/shared/ui/Framer"
import { Link } from "@/shared/ui/primitives/button"
import { Image } from "@/shared/ui/primitives/Image"
import { pastorData } from "../data"

export function Hero() {
	return (
		<section className="relative min-h-app-height pt-header-claim flex items-center bg-linear-to-br from-primary to-primary-container overflow-hidden">
			<div className="absolute inset-0 opacity-20">
				<div className="absolute inset-0 bg-[url('/images/church-side-2.avif')] bg-cover bg-center" />
			</div>

			<div className="container-app relative z-10 py-20">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
					<AnimatePosition
						variants={slideUp}
						className="text-center md:text-left"
					>
						<p className="text-secondary font-semibold text-sm uppercase tracking-wider mb-4 ">
							Meet Our Senior Pastor
						</p>
						<p className="text-lg text-white/80 mb-8">
							Saved at the age of twenty, Pastor Speer&rsquo;s life was
							transformed by the grace of God. From the classrooms of Virginia
							Tech to the pulpits of Ghana, his journey is a testimony of
							surrender, service, and a passion for seeing souls won to Christ.
						</p>
						<div className="flex flex-wrap justify-center md:justify-start gap-4 *:gap-x-2 *:text-base">
							<Link href={routes.pastor.biography} variant="gold" size="lg">
								Read Biography
								<span className="material-symbols-outlined text-lg">
									arrow_downward
								</span>
							</Link>
							<Link
								href={CHURCH_INFO.pastor.profile[1]}
								target="_blank"
								rel="noopener noreferrer"
								variant="secondary"
								size="lg"
								className="border-white text-white hover:bg-white hover:text-primary"
							>
								FBMI Profile
								<span className="material-symbols-outlined text-lg">
									launch
								</span>
							</Link>
						</div>
					</AnimatePosition>

					<AnimatePosition
						variants={slideUp}
						className="row-start-1 md:col-start-2  flex justify-center"
					>
						<div className="relative">
							<div className="w-72 h-72 rounded-full overflow-hidden border-4 border-white/20">
								<Image
									src={CHURCH_INFO.pastor.image}
									alt={pastorData.name}
									className="w-full h-full object-cover"
									loading="lazy"
								/>
							</div>
							<div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-2xl px-6 py-3 shadow-lg">
								<p className="font-headline font-semibold text-primary text-sm">
									{pastorData.name}
								</p>
								<p className="text-on-surface-variant text-xs">
									{pastorData.title}
								</p>
							</div>
						</div>
					</AnimatePosition>
				</div>
			</div>
		</section>
	)
}
