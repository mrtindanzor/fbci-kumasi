import { AnimatePosition, slideUp, staggerContainer } from "@/shared/ui/Framer"
import { motion } from "framer-motion"
import { conference } from "../data"

const infoItems = [
	{ icon: "bookmark", label: "Theme", value: conference.theme },
	{ icon: "event", label: "Schedule", value: conference.schedule },
	...(conference.location
		? [{ icon: "location_on", label: "Location", value: conference.location }]
		: []),
]

export function ConferenceInfo() {
	return (
		<section className="section-gap bg-surface-container">
			<div className="container-app">
				<AnimatePosition variants={slideUp}>
					<h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-2">
						Conference Details
					</h2>
					<div className="w-8 h-0.5 bg-secondary rounded-full mb-12" />
				</AnimatePosition>

				<motion.ul
					variants={staggerContainer}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true }}
					className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto"
				>
					{infoItems.map((item) => (
						<motion.li
							key={item.label}
							variants={slideUp}
							className="bg-surface rounded-2xl p-6 border border-outline-variant/30"
						>
							<span className="material-symbols-outlined text-3xl text-secondary mb-3 block">
								{item.icon}
							</span>
							<p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">
								{item.label}
							</p>
							<p className="text-lg text-primary">{item.value}</p>
						</motion.li>
					))}
				</motion.ul>
			</div>
		</section>
	)
}
