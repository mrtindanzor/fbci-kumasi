import { motion } from "framer-motion"
import { ministriesDetail } from "@/shared/db"
import { slideUp, staggerContainer } from "@/shared/ui/Framer"
import { Button } from "@/shared/ui/primitives/button"

export function MinistryCards() {
	return (
		<section className="section-gap">
			<div className="container-app">
				<motion.div
					variants={staggerContainer}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true }}
					className="space-y-12"
				>
					{ministriesDetail.map((ministry, index) => (
						<motion.div
							key={ministry.id}
							variants={slideUp}
							className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${
								index % 2 === 1 ? "md:direction-rtl" : ""
							}`}
						>
							<div className={`${index % 2 === 1 ? "md:order-2" : ""}`}>
								<h2 className="text-3xl font-headline font-bold text-primary mb-4">
									{ministry.name}
								</h2>
								<p className="text-on-surface-variant leading-relaxed mb-6">
									{ministry.description}
								</p>
								{ministry.cta && (
									<Button variant="primary">
										{ministry.cta}
										<span className="material-symbols-outlined text-lg">
											arrow_forward
										</span>
									</Button>
								)}
							</div>
							<div className={`${index % 2 === 1 ? "md:order-1" : ""}`}>
								<div className="rounded-2xl overflow-hidden aspect-[4/3]">
									<img
										src={ministry.image}
										alt={ministry.name}
										className="w-full h-full object-cover"
										loading="lazy"
									/>
								</div>
							</div>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	)
}
