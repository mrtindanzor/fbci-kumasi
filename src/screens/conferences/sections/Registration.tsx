import { motion } from "framer-motion"
import { AnimatePosition, slideUp, staggerContainer } from "@/shared/ui/Framer"
import { Button } from "@/shared/ui/primitives/button"
import { registrationTiers } from "../data"

export function Registration() {
	return (
		<section className="section-gap bg-surface-container">
			<div className="container-app">
				<AnimatePosition variants={slideUp}>
					<h2 className="text-3xl md:text-4xl font-headline font-bold text-primary text-center mb-4">
						Secure your place
					</h2>
					<p className="text-on-surface-variant text-center max-w-xl mx-auto mb-12">
						Early bird registration is open until August 30th. Group discounts
						are available for delegations of 5 or more.
					</p>
				</AnimatePosition>

				<motion.div
					variants={staggerContainer}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true }}
					className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto"
				>
					{registrationTiers.map((tier) => (
						<motion.div
							key={tier.id}
							variants={slideUp}
							className="bg-surface rounded-3xl p-8 text-center border border-outline-variant/30"
						>
							<h3 className="text-xl font-headline font-semibold text-primary mb-2">
								{tier.name}
							</h3>
							<div className="mb-6">
								<span className="text-4xl font-bold text-primary">
									${tier.price}
								</span>
								<span className="text-on-surface-variant text-sm">/person</span>
							</div>
							<Button
								variant={tier.id === "group" ? "gold" : "primary"}
								className="w-full"
							>
								{tier.description}
							</Button>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	)
}
