import { motion } from "framer-motion"
import { AnimatePosition, slideUp, staggerContainer } from "@/shared/ui/Framer"
import { Button } from "@/shared/ui/primitives/button"

const outreachItems = [
	{
		icon: "school",
		title: "School Preaching",
		description:
			"Engaging the youth where they are. Our school outreach program focuses on character building, moral guidance, and sharing the Gospel in educational settings across the region.",
		cta: "Learn More",
	},
	{
		icon: "diversity_3",
		title: "Personal Evangelism",
		description:
			"The power of one-on-one connection. We train and deploy individuals to share their faith through personal relationships and community interaction.",
		cta: "Get Involved",
	},
	{
		icon: "storefront",
		title: "Market Preaching",
		description:
			"Sharing the word in the busiest hubs. Our market outreach brings light and hope to the marketplace, meeting people in the midst of their daily lives.",
		cta: "",
	},
]

export function Outreach() {
	return (
		<section className="section-gap bg-surface-container">
			<div className="container-app">
				<AnimatePosition variants={slideUp}>
					<h2 className="text-3xl md:text-4xl font-headline font-bold text-primary text-center mb-4">
						Outreach & Evangelism
					</h2>
					<p className="text-on-surface-variant text-center max-w-xl mx-auto mb-12">
						Taking our mission beyond the walls of the church.
					</p>
				</AnimatePosition>

				<motion.div
					variants={staggerContainer}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true }}
					className="grid grid-cols-1 md:grid-cols-3 gap-6"
				>
					{outreachItems.map((item) => (
						<motion.div
							key={item.title}
							variants={slideUp}
							className="bg-surface rounded-2xl p-6 border border-outline-variant/30"
						>
							<span className="material-symbols-outlined text-4xl text-secondary mb-4 block">
								{item.icon}
							</span>
							<h3 className="text-lg font-headline font-semibold text-primary mb-2">
								{item.title}
							</h3>
							<p className="text-on-surface-variant text-sm leading-relaxed mb-4">
								{item.description}
							</p>
							{item.cta && (
								<Button
									variant="ghost"
									size="sm"
									className="text-secondary font-semibold hover:underline inline-flex items-center gap-1 w-fit"
								>
									{item.cta}
									<span className="material-symbols-outlined text-sm">
										north_east
									</span>
								</Button>
							)}
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	)
}
