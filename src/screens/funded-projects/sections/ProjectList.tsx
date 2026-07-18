import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { slideUp, staggerContainer } from "@/shared/ui/Framer"
import { Button } from "@/shared/ui/primitives/button"

type FundedProject = {
	id: string
	title: string
	raised: number
	description: string
	image?: string
}

const FUNDED_PROJECTS: FundedProject[] = [
	{
		id: "hacwa-campus-expansion",
		title: "HACWA Campus Expansion",
		raised: 125000,
		description:
			"Construction of the new theological library and two additional lecture halls for our growing student body in Ghana.",
	},
	{
		id: "kumasi-community-well",
		title: "Kumasi Community Well",
		raised: 18500,
		description:
			"Providing sustainable clean water access to over 300 families while establishing a new mission station in the heart of the village.",
	},
	{
		id: "gospel-radio-broadcast",
		title: "Gospel Radio Broadcast",
		raised: 42000,
		description:
			"Acquisition of professional broadcasting equipment to expand our reach to millions through terrestrial and digital radio.",
	},
]

export function ProjectList() {
	return (
		<section className="section-gap">
			<div className="container-app">
				<motion.ul
					variants={staggerContainer}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true }}
					className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
				>
					{FUNDED_PROJECTS.map((project) => (
						<motion.li
							key={project.id}
							variants={slideUp}
							className="bg-surface rounded-2xl border border-outline-variant overflow-hidden group/card"
						>
							<div className="p-8 grid gap-4">
								<span className="inline-flex items-center gap-2 text-sm font-label uppercase tracking-wider text-secondary">
									<span className="material-symbols-outlined text-lg">
										check_circle
									</span>
									Project Fully Funded
								</span>
								<h3 className="text-xl font-headline font-semibold text-primary">
									{project.title}
								</h3>
								<div>
									<p className="text-xs font-label uppercase tracking-wider text-on-surface-variant mb-1">
										Total Raised
									</p>
									<p className="text-3xl font-headline font-bold text-secondary">
										${project.raised.toLocaleString()}.00
									</p>
								</div>
								<p className="text-on-surface-variant text-sm leading-relaxed">
									{project.description}
								</p>
								<Button
									variant="ghost"
									size="sm"
									className="inline-flex items-center gap-2 w-fit"
								>
									View Project Impact <ArrowRight className="size-4" />
								</Button>
							</div>
						</motion.li>
					))}
				</motion.ul>
			</div>
		</section>
	)
}
