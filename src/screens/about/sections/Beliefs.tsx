import { motion } from "framer-motion"
import { routes } from "@/shared/routes"
import { AnimatePosition, slideUp, staggerContainer } from "@/shared/ui/Framer"
import { Link } from "@/shared/ui/primitives/button"

type Belief = {
	icon: string
	title: string
	description: string
	reference: string
}

const beliefs: Belief[] = [
	{
		icon: "auto_stories",
		title: "We all are sinners.",
		description: "We have all sinned and fall short of the glory of God.",
		reference: "Romans 3:23",
	},
	{
		icon: "favorite",
		title: "There is a punishment for sin.",
		description: "We deserve to die and go to Hell because of our sin.",
		reference: "Romans 6:23a, Revelation 21:8",
	},
	{
		icon: "groups",
		title: "We cannot save ourselves.",
		description: "There is nothing we can do to save ourselves",
		reference: "Titus 3:5, Ephesians 2:8-9, James 2:10",
	},
	{
		icon: "groups",
		title: "Why Jesus came to die.",
		description: "Jesus died to pay for our sins.",
		reference: "Romans 5:8",
	},
	{
		icon: "groups",
		title: "How we can be saved.",
		description:
			"We receive the gift of eternal life by faith in Christ Jesus alone.",
		reference: "Romans 3:28, Romans 6:23b, John 3:16,18,36",
	},
	{
		icon: "groups",
		title: "Eternal Security.",
		description: "Once we are saved, we are ALWAYS saved.",
		reference: "Galatians 3:26, John 5:24, Romans 4:1-8",
	},
]

export function Beliefs() {
	return (
		<section className="section-gap bg-surface-container">
			<div className="container-app">
				<AnimatePosition variants={slideUp} whileInView="show">
					<h2 className="text-3xl md:text-4xl font-headline font-bold text-primary text-center mb-12">
						What We Believe
					</h2>
				</AnimatePosition>

				<motion.div
					variants={staggerContainer}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true }}
					className="grid gap-6 max-w-5xl mx-auto"
				>
					<ul className="space-y-6">
						{beliefs.map((belief) => (
							<BeliefCard key={belief.title} {...belief} />
						))}
					</ul>

					<div className="max-w-2xl mx-auto text-center">
						<h3 className="text-3xl font-headline font-bold text-primary mb-4">
							Want a deeper understanding?
						</h3>
						<div className="flex flex-wrap justify-center gap-4 mb-10">
							<Link href={routes.heaven} variant="primary" size="lg">
								Learn More
							</Link>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	)
}

function BeliefCard({ title, description, reference }: Belief) {
	return (
		<motion.li
			key={title}
			variants={slideUp}
			className="bg-surface rounded-2xl p-8 border border-outline-variant/30"
		>
			<h3 className="text-xl font-headline font-semibold text-primary mb-3">
				{title}
			</h3>
			<p className="text-on-surface-variant leading-relaxed mb-4">
				{description}
			</p>
			<p className="text-sm text-secondary font-medium">{reference}</p>
		</motion.li>
	)
}
