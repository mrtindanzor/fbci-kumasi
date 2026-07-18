import { motion } from "framer-motion"
import { Download, Eye } from "lucide-react"
import { AnimatePosition, slideUp, staggerContainer } from "@/shared/ui/Framer"
import { Link } from "@/shared/ui/primitives/button"
import { conference } from "../data"

export function ConferenceResources() {
	if (conference.resources.length === 0) return null

	return (
		<section className="section-gap bg-surface-container">
			<div className="container-app">
				<AnimatePosition variants={slideUp}>
					<h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-2">
						Conference Resources
					</h2>
					<div className="w-8 h-0.5 bg-secondary rounded-full mb-12" />
				</AnimatePosition>

				<motion.div
					variants={staggerContainer}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true }}
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
				>
					{conference.resources.map((resource) => (
						<motion.div
							key={resource.id}
							variants={slideUp}
							className="bg-surface rounded-2xl p-6 border border-outline-variant/30"
						>
							<div className="flex items-start gap-3 mb-4">
								<span className="material-symbols-outlined text-3xl text-secondary">
									picture_as_pdf
								</span>
								<div className="min-w-0">
									<h3 className="font-headline font-semibold text-primary truncate">
										{resource.title}
									</h3>
									<div className="flex items-center gap-2 mt-1">
										<span className="text-xs text-on-surface-variant uppercase tracking-wider">
											PDF
										</span>
										{resource.size && (
											<>
												<span className="text-on-surface-variant/30">·</span>
												<span className="text-xs text-on-surface-variant">
													{resource.size}
												</span>
											</>
										)}
									</div>
								</div>
							</div>

							<div className="flex gap-2">
								<Link
									href={resource.file}
									target="_blank"
									variant="none"
									size="none"
									className="inline-flex items-center gap-1.5 h-9 px-4 rounded-lg bg-surface-container border border-outline-variant text-sm text-on-surface-variant hover:bg-surface-container-high transition-colors duration-200"
								>
									<Eye className="size-4" />
									View
								</Link>
								<Link
									href={resource.file}
									download
									variant="none"
									size="none"
									className="inline-flex items-center gap-1.5 h-9 px-4 rounded-lg bg-primary text-white text-sm hover:bg-primary/90 transition-colors duration-200"
								>
									<Download className="size-4" />
									Download
								</Link>
							</div>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	)
}
