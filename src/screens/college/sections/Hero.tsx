import { motion } from "framer-motion"
import { BRANDING } from "@/shared/constants"
import { AnimatePosition, slideUp, staggerContainer } from "@/shared/ui/Framer"
import { Button } from "@/shared/ui/primitives/button"
import { collegeData } from "../data"

export function Hero() {
	return (
		<section className="relative min-h-[400px] flex items-center bg-gradient-to-br from-primary to-primary-container overflow-hidden">
			<div className="container-app relative z-10 py-20">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
					<AnimatePosition variants={slideUp}>
						<h1 className="text-4xl md:text-6xl font-headline font-bold text-white leading-tight mb-4">
							{BRANDING.college.name}
						</h1>
						<p className="text-lg text-white/80 mb-8">
							Training the next generation of leaders and servants. Equipping
							your mind and spirit for the mission field.
						</p>
						<div className="flex flex-wrap gap-4">
							<Button variant="gold" size="lg">
								Explore Programs
								<span className="material-symbols-outlined text-lg">
									arrow_forward
								</span>
							</Button>
							<Button
								variant="secondary"
								size="lg"
								className="border-white text-white hover:bg-white hover:text-primary"
							>
								Apply Now
							</Button>
						</div>
					</AnimatePosition>

					<AnimatePosition variants={slideUp} className="hidden md:block">
						<motion.div
							variants={staggerContainer}
							initial="hidden"
							whileInView="show"
							viewport={{ once: true }}
							className="grid grid-cols-2 gap-4"
						>
							{collegeData.stats.map((stat) => (
								<motion.div
									key={stat.label}
									variants={slideUp}
									className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center"
								>
									<p className="text-3xl font-headline font-bold text-white">
										{stat.value}
									</p>
									<p className="text-white/70 text-sm mt-1">{stat.label}</p>
								</motion.div>
							))}
						</motion.div>
					</AnimatePosition>
				</div>
			</div>
		</section>
	)
}
