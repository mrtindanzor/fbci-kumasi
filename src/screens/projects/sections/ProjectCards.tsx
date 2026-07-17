import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { routes } from "@/shared/routes"
import { slideUp, staggerContainer } from "@/shared/ui/Framer"
import { Link } from "@/shared/ui/primitives/button"
import { Image } from "@/shared/ui/primitives/Image"
import { projects } from "../data"

export function ProjectCards() {
	return (
		<section className="section-gap">
			<div className="container-app">
				<motion.ul
					variants={staggerContainer}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true }}
					className="grid gap-x-4 gap-y-8 md:grid-cols-2 xl:grid-cols-3 mx-auto"
				>
					{projects.map((project) => (
						<motion.li
							key={project.id}
							variants={slideUp}
							className="bg-surface-container relative overflow-hidden group/card"
						>
							<div className="overflow-hidden">
								<Image
									src={project.image}
									alt={project.title}
									className="w-full h-52 group-hover/card:scale-110 transition duration-800 ease-in-out object-cover"
									loading="lazy"
								/>
							</div>
							<div className="p-8 grid gap-y-1">
								<Link
									href={routes.projects.projectById(project.id)}
									variant="primary"
									size="sm"
									className="w-fit gap-x-2 link px-4 ml-auto py-1 rounded-full"
								>
									View
									<ArrowRight className="size-4.5" />
								</Link>
								<h3 className="text-xl font-headline font-semibold text-primary mt-3">
									{project.title}
								</h3>
							</div>
						</motion.li>
					))}
				</motion.ul>
			</div>
		</section>
	)
}
