import { motion } from "framer-motion"
import { slideUp, staggerContainer } from "@/shared/ui/Framer"
import { CHURCHES } from "../data"

export function ChurchDirectory() {
	return (
		<section className="section-gap">
			<div className="container-app">
				<div className="flex flex-wrap gap-3 mb-10">
					{["All", ...new Set(CHURCHES.map((c) => c.country))].map((filter) => (
						<button
							key={filter}
							type="button"
							className="px-4 py-2 text-sm font-label uppercase tracking-wider rounded-full border border-outline-variant text-on-surface-variant hover:border-secondary hover:text-secondary transition-colors"
						>
							{filter}
						</button>
					))}
				</div>

				<div className="mb-10 p-4 bg-surface-container rounded-xl border border-outline-variant flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
					<div className="flex items-center gap-2 text-on-surface-variant">
						<span className="material-symbols-outlined text-lg text-secondary">
							person
						</span>
						<span className="text-xs font-medium">Pastor in charge</span>
					</div>
					<div className="flex items-center gap-2 text-on-surface-variant">
						<span className="material-symbols-outlined text-lg text-secondary">
							location_on
						</span>
						<span className="text-xs font-medium">Church location</span>
					</div>
					<div className="flex items-center gap-2 text-on-surface-variant">
						<span className="material-symbols-outlined text-lg text-secondary">
							phone
						</span>
						<span className="text-xs font-medium">Contact number</span>
					</div>
				</div>

				<motion.ul
					variants={staggerContainer}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true }}
					className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
				>
					{CHURCHES.map((church) => (
						<motion.li
							key={church.id}
							variants={slideUp}
							className="bg-surface rounded-2xl border border-outline-variant p-6 group/card"
						>
							<div className="flex items-center gap-3 mb-4">
								<span className="material-symbols-outlined text-3xl text-secondary">
									church
								</span>
								<div>
									<span className="text-xs font-label uppercase tracking-wider text-secondary">
										{church.country}
									</span>
								</div>
							</div>

							<h3 className="text-xl font-headline font-semibold text-primary mb-3">
								{church.name}
							</h3>

							<div className="space-y-2 text-sm">
								<div className="flex items-center gap-2 text-on-surface-variant">
									<span className="material-symbols-outlined text-lg">
										person
									</span>
									{church.pastor}
								</div>
								{(church.region || church.city) && (
									<div className="flex items-center gap-2 text-on-surface-variant">
										<span className="material-symbols-outlined text-lg">
											location_on
										</span>
										{[church.region, church.city].filter(Boolean).join(", ")}
									</div>
								)}
								{church.contact && (
									<div className="flex items-center gap-2 text-on-surface-variant">
										<span className="material-symbols-outlined text-lg">
											phone
										</span>
										<a
											href={`tel:${church.contact}`}
											className="hover:text-secondary transition-colors"
										>
											{church.contact}
										</a>
									</div>
								)}
							</div>
						</motion.li>
					))}
				</motion.ul>
			</div>
		</section>
	)
}
