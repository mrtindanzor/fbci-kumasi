import { motion } from "framer-motion"
import { slideUp, staggerContainer } from "@/shared/ui/Framer"
import { RESOURCES } from "../constants"

export function ResourceLibrary() {
	return (
		<section className="section-gap bg-surface-container">
			<div className="container-app">
				<motion.ul
					variants={staggerContainer}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true }}
					className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
				>
					{RESOURCES.map((item) => (
						<motion.li
							key={item.id}
							variants={slideUp}
							className="bg-surface rounded-xl p-6 border border-outline-variant group/resource"
						>
							<span className="material-symbols-outlined text-3xl text-secondary mb-3 block">
								{item.icon}
							</span>
							<h3 className="font-headline font-semibold text-primary mb-2">
								{item.title}
							</h3>
							<p className="text-sm text-on-surface-variant mb-4 line-clamp-2">
								{item.description}
							</p>
							<div className="flex items-center justify-between text-xs text-on-surface-variant">
								<span>
									{item.type} &middot; {item.size}
								</span>
								<button
									type="button"
									className="inline-flex items-center gap-1 text-secondary font-semibold hover:gap-2 transition-all"
								>
									Download
									<span className="material-symbols-outlined text-base">
										download
									</span>
								</button>
							</div>
						</motion.li>
					))}
				</motion.ul>

				<div className="text-center mt-10">
					<button
						type="button"
						className="px-8 py-3 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-primary hover:text-white transition-colors"
					>
						Load More Resources
					</button>
				</div>
			</div>
		</section>
	)
}
