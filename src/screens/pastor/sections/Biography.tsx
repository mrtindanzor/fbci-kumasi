import { motion } from "framer-motion"
import { AnimatePosition, slideUp, staggerContainer } from "@/shared/ui/Framer"
import { pastorData } from "../data"

export function Biography() {
	return (
		<section className="section-gap">
			<div className="container-app">
				<div className="max-w-4xl mx-auto">
					<AnimatePosition variants={slideUp}>
						<div className="bg-surface-container rounded-2xl p-8 md:p-12 mb-12">
							<span className="material-symbols-outlined text-4xl text-secondary mb-4 block">
								format_quote
							</span>
							<p className="text-xl md:text-2xl font-headline italic text-primary leading-relaxed">
								{pastorData.quote}
							</p>
						</div>
					</AnimatePosition>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-12">
						<AnimatePosition variants={slideUp}>
							<div className="flex gap-6 mb-8">
								{pastorData.credentials.map((cred) => (
									<div key={cred.text} className="flex items-center gap-2">
										<span className="material-symbols-outlined text-xl text-secondary">
											{cred.icon}
										</span>
										<span className="text-on-surface-variant text-sm">
											{cred.text}
										</span>
									</div>
								))}
							</div>

							<div className="flex gap-8 mb-8">
								<div>
									<p className="text-sm text-on-surface-variant">
										Family & Faith
									</p>
									<p className="font-semibold text-primary">
										35 Years of Shared Ministry
									</p>
								</div>
							</div>
						</AnimatePosition>

						<AnimatePosition variants={slideUp}>
							<h2 className="text-3xl font-headline font-bold text-primary mb-6">
								A Vision of Restoration
							</h2>
							{pastorData.biography.map((paragraph, index) => (
								<p
									key={index}
									className="text-on-surface-variant leading-relaxed mb-4"
								>
									{paragraph}
								</p>
							))}
						</AnimatePosition>
					</div>

					<motion.div
						variants={staggerContainer}
						initial="hidden"
						whileInView="show"
						viewport={{ once: true }}
						className="grid grid-cols-2 gap-6 mt-12 max-w-md mx-auto"
					>
						{pastorData.stats.map((stat) => (
							<motion.div
								key={stat.label}
								variants={slideUp}
								className="text-center bg-surface-container rounded-2xl p-6"
							>
								<p className="text-3xl font-headline font-bold text-primary">
									{stat.value}
								</p>
								<p className="text-on-surface-variant text-sm mt-1">
									{stat.label}
								</p>
							</motion.div>
						))}
					</motion.div>
				</div>
			</div>
		</section>
	)
}
