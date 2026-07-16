import { AnimatePosition, slideUp } from "@/shared/ui/Framer"
import { Button } from "@/shared/ui/primitives/button"
import { pastorData } from "../data"

export function Hero() {
	return (
		<section className="relative min-h-[600px] flex items-center bg-gradient-to-br from-primary to-primary-container overflow-hidden">
			<div className="absolute inset-0 opacity-15">
				<div className="absolute inset-0 bg-[url('https://picsum.photos/seed/pastor-hero/1920/1080')] bg-cover bg-center" />
			</div>

			<div className="container-app relative z-10 py-20">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
					<AnimatePosition variants={slideUp}>
						<p className="text-secondary font-semibold text-sm uppercase tracking-wider mb-4">
							Meet Our Lead Pastor
						</p>
						<p className="text-lg text-white/80 mb-8">
							Guided by faith and a passion for restoration, Pastor Anderson has
							dedicated three decades to building a sanctuary where every soul
							can find peace and purpose.
						</p>
						<div className="flex flex-wrap gap-4">
							<Button variant="gold" size="lg">
								Read Biography
								<span className="material-symbols-outlined text-lg">
									arrow_downward
								</span>
							</Button>
							<Button
								variant="secondary"
								size="lg"
								className="border-white text-white hover:bg-white hover:text-primary"
							>
								FBMI Profile
								<span className="material-symbols-outlined text-lg">
									launch
								</span>
							</Button>
						</div>
					</AnimatePosition>

					<AnimatePosition
						variants={slideUp}
						className="hidden md:flex justify-center"
					>
						<div className="relative">
							<div className="w-72 h-72 rounded-full overflow-hidden border-4 border-white/20">
								<img
									src="https://picsum.photos/seed/pastor-samuel/400/400"
									alt={pastorData.name}
									className="w-full h-full object-cover"
									loading="lazy"
								/>
							</div>
							<div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-2xl px-6 py-3 shadow-lg">
								<p className="font-headline font-semibold text-primary text-sm">
									{pastorData.name}
								</p>
								<p className="text-on-surface-variant text-xs">
									{pastorData.title}
								</p>
							</div>
						</div>
					</AnimatePosition>
				</div>
			</div>
		</section>
	)
}
