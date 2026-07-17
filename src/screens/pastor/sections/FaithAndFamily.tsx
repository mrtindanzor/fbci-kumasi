import { motion } from "framer-motion"
import { AnimatePosition, slideUp, staggerContainer } from "@/shared/ui/Framer"

const year = new Date().getFullYear()

const cards = [
	{
		icon: "favorite",
		title: "A Life Transformed",
		description:
			"Saved at the age of twenty, Pastor Speer's life was radically changed by God's grace. From a nominal church-goer to a passionate servant of Christ, his testimony is a picture of what God can do with a surrendered heart.",
	},
	{
		icon: "groups",
		title: "Together in Ministry",
		description: `Married to Elizabeth since ${year - 1997}, the Speers have served side by side in ministry. Elizabeth faithfully serves as a pianist, Sunday School teacher, and nursery worker — a blessing to her husband and the church.`,
	},
	{
		icon: "diversity_3",
		title: "A Family That Serves",
		description:
			"God has blessed the Speers with five children: Kimberly, James, Rachel, Grace, and Michael. Each one is actively serving in ministry — from Washington State to Ghana — continuing the legacy of faithful service.",
	},
	{
		icon: "school",
		title: "Training Laborers",
		description:
			"As President of Hyles-Anderson College of West Africa, Pastor Speer is investing in the next generation of pastors and missionaries, equipping them to reach West Africa and the world with the gospel.",
	},
]

export function FaithAndFamily() {
	return (
		<section className="section-gap">
			<div className="container-app">
				<AnimatePosition variants={slideUp}>
					<div className="text-center mb-12">
						<h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-3">
							Faith & Family
						</h2>
						<p className="text-on-surface-variant max-w-xl mx-auto">
							The heart of our pastor&rsquo;s ministry
						</p>
					</div>
				</AnimatePosition>

				<motion.div
					variants={staggerContainer}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true }}
					className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
				>
					{cards.map((card) => (
						<motion.div
							key={card.title}
							variants={slideUp}
							className="bg-surface rounded-2xl p-8 border border-outline-variant/30"
						>
							<span className="material-symbols-outlined text-3xl text-secondary mb-4 block">
								{card.icon}
							</span>
							<h3 className="text-xl font-headline font-semibold text-primary mb-3">
								{card.title}
							</h3>
							<p className="text-on-surface-variant leading-relaxed">
								{card.description}
							</p>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	)
}
