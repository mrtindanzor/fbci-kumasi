import { motion } from "framer-motion"
import { slideUp, staggerContainer } from "@/shared/ui/Framer"

const mediaItems = [
	{
		icon: "radio",
		title: "Voice of Hope",
		description: "Broadcasting wisdom 24/7 across the nation.",
		cta: "Listen Now",
		href: "#",
	},
	{
		icon: "live_tv",
		title: "Sanctuary TV",
		description: "Weekly broadcasts on DSTV and local networks.",
		cta: "Watch Live",
		href: "#",
	},
]

export function MediaMinistry() {
	return (
		<section className="section-gap">
			<div className="container-app">
				<motion.div
					variants={staggerContainer}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true }}
					className="grid grid-cols-1 md:grid-cols-2 gap-8"
				>
					{mediaItems.map((item) => (
						<motion.div
							key={item.title}
							variants={slideUp}
							className="bg-surface-container rounded-2xl p-8 border border-outline-variant/30"
						>
							<span className="material-symbols-outlined text-5xl text-secondary mb-4 block">
								{item.icon}
							</span>
							<h3 className="text-xl font-headline font-semibold text-primary mb-2">
								{item.title}
							</h3>
							<p className="text-on-surface-variant leading-relaxed mb-6">
								{item.description}
							</p>
							<a
								href={item.href}
								className="inline-flex items-center gap-2 text-secondary font-semibold hover:underline"
							>
								{item.cta}
							</a>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	)
}
