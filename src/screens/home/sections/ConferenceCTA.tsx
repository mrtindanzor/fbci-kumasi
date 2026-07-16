import { routes } from "@/shared/routes"
import { AnimatePosition, slideUp } from "@/shared/ui/Framer"
import { Link } from "@/shared/ui/primitives/button"

const highlights = [
	{ icon: "menu_book", label: "Bible Preaching" },
	{ icon: "school", label: "Ministry Training" },
	{ icon: "diversity_3", label: "Fellowship" },
	{ icon: "public", label: "Missions" },
]

export function ConferenceCTA() {
	return (
		<section className="relative w-full min-h-app-height flex items-center overflow-hidden">
			<div className="absolute inset-0">
				<div className="absolute inset-0 bg-[url('/images/church-side-1.avif')] bg-cover bg-center" />
			</div>
			<div className="absolute inset-0 bg-linear-to-b from-primary/90 via-primary/80 to-primary/90" />

			<div className="relative z-10 w-full py-16 md:py-20">
				<div className="container-app">
					<AnimatePosition variants={slideUp} className="max-w-3xl">
						<span className="inline-block bg-secondary/20 text-secondary px-4 py-1.5 rounded-full text-sm font-semibold uppercase tracking-wider mb-6">
							Annual Event
						</span>

						<h2 className="font-headline text-3xl md:text-4xl lg:text-5xl text-white font-bold leading-tight drop-shadow-lg">
							Annual Pastors & Workers Conference
						</h2>

						<p className="mt-3 text-lg md:text-xl text-secondary font-semibold">
							Held Every August at Fundamental Baptist Church International
						</p>

						<div className="flex flex-wrap items-center gap-5 mt-5 text-white/80 text-sm md:text-base">
							<span className="inline-flex items-center gap-1.5">
								<span className="material-symbols-outlined text-base">
									event
								</span>
								Every August
							</span>
							<span className="inline-flex items-center gap-1.5">
								<span className="material-symbols-outlined text-base">
									location_on
								</span>
								Kumasi, Ghana
							</span>
						</div>

						<p className="mt-5 text-white/85 text-body-lg md:text-lg max-w-2xl leading-relaxed">
							This annual conference brings together pastors, church workers,
							missionaries, and Christians for powerful Bible preaching,
							practical ministry training, fellowship, and spiritual
							encouragement. Join us for a time of refreshing and equipping.
						</p>

						<div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl">
							{highlights.map((item) => (
								<div
									key={item.label}
									className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10"
								>
									<span className="material-symbols-outlined text-secondary text-xl">
										{item.icon}
									</span>
									<span className="text-white text-sm md:text-base font-medium">
										{item.label}
									</span>
								</div>
							))}
						</div>

						<div className="mt-8 flex flex-col sm:flex-row gap-4">
							<Link
								href={routes.conferences}
								variant="gold"
								size="lg"
								className="font-label"
							>
								Learn More
								<span className="material-symbols-outlined text-lg">
									arrow_forward
								</span>
							</Link>
							<Link
								href={routes.conferences}
								variant="secondary"
								size="lg"
								className="border-white text-white hover:bg-white hover:text-primary font-label"
							>
								View Conference Resources
							</Link>
						</div>
					</AnimatePosition>
				</div>
			</div>
		</section>
	)
}
