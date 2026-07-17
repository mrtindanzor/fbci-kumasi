import { motion } from "framer-motion"
import { AnimatePosition, slideUp, staggerContainer } from "@/shared/ui/Framer"
import { Link } from "@/shared/ui/primitives/button"

export function ImpactSection() {
	return (
		<section className="section-gap bg-surface-container">
			<div className="container-app">
				<motion.ul
					variants={staggerContainer}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true }}
					className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto mb-16"
				>
					{[
						{
							icon: "school",
							title: "HACWA Scholarships",
							description:
								"Supporting the next generation of pastors and leaders across West Africa.",
						},
						{
							icon: "church",
							title: "Church Planting",
							description:
								"Establishing fundamental churches in rural and urban communities.",
						},
						{
							icon: "volunteer_activism",
							title: "Community Outreach",
							description:
								"Providing physical and spiritual support to families in need.",
						},
						{
							icon: "menu_book",
							title: "Resource Dev",
							description:
								"Printing and distributing Bibles and sound theological literature.",
						},
					].map((area) => (
						<motion.li
							key={area.title}
							variants={slideUp}
							className="bg-surface rounded-xl p-6 border border-outline-variant text-center"
						>
							<span className="material-symbols-outlined text-4xl text-secondary mb-3 block">
								{area.icon}
							</span>
							<h3 className="font-headline font-semibold text-primary mb-2">
								{area.title}
							</h3>
							<p className="text-sm text-on-surface-variant">
								{area.description}
							</p>
						</motion.li>
					))}
				</motion.ul>

				<AnimatePosition variants={slideUp}>
					<div className="max-w-2xl mx-auto text-center">
						<div className="bg-surface rounded-2xl p-8 border border-outline-variant">
							<span className="material-symbols-outlined text-5xl text-secondary mb-4 block">
								favorite
							</span>
							<h2 className="text-2xl font-headline font-bold text-primary mb-4">
								Your Sacrifice, His Sovereignty
							</h2>
							<p className="text-on-surface-variant mb-6">
								Every contribution to Fundamental Baptist Church International
								is managed with the highest level of accountability and prayer.
							</p>
							<p className="text-sm text-on-surface-variant italic mb-6">
								&ldquo;FBCI is a registered non-profit organization. All
								donations from the USA are tax-deductible to the full extent of
								the law.&rdquo;
							</p>
							<Link href="#" variant="secondary" className="gap-x-2">
								<span className="material-symbols-outlined text-lg">
									receipt_long
								</span>
								View Missions Report
							</Link>
						</div>
					</div>
				</AnimatePosition>
			</div>
		</section>
	)
}
