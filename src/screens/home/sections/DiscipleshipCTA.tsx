import { routes } from "@/shared/routes"
import { AnimatePosition, slideUp } from "@/shared/ui/Framer"
import { Link } from "@/shared/ui/primitives/button"

export function DiscipleshipCTA() {
	return (
		<section className="relative w-full min-h-[500px] md:min-h-[600px] flex items-center overflow-hidden">
			<div className="absolute inset-0">
				<div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/257907/pexels-photo-257907.jpeg')] bg-cover bg-center" />
			</div>
			<div className="absolute inset-0 bg-linear-to-b from-primary/70 via-primary/50 to-primary/85" />

			<div className="relative z-10 w-full py-16 md:py-20">
				<div className="container-app">
					<AnimatePosition
						variants={slideUp}
						className="max-w-3xl mx-auto text-center"
					>
						<span className="material-symbols-outlined text-5xl md:text-6xl text-secondary mb-5 block">
							auto_stories
						</span>

						<h2 className="font-headline text-3xl md:text-4xl lg:text-5xl text-white font-bold leading-tight drop-shadow-lg">
							Discipleship Lesson Books
						</h2>

						<p className="mt-5 text-white/85 text-body-lg md:text-lg max-w-2xl mx-auto leading-relaxed">
							Growing in your walk with Christ doesn't end at salvation. We've
							prepared a collection of free discipleship lesson books to help
							you strengthen your faith, understand God's Word, and continue
							your spiritual journey. Whether you're a new believer or looking
							to grow deeper in your Christian life, these resources are
							available to guide and encourage you.
						</p>

						<div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
							<Link
								href={routes.resources.discipleship}
								variant="gold"
								size="lg"
								className="font-label"
							>
								Start Learning
								<span className="material-symbols-outlined text-lg">
									arrow_forward
								</span>
							</Link>
							<Link
								href={routes.resources.home}
								variant="secondary"
								size="lg"
								className="border-white text-white hover:bg-white hover:text-primary font-label"
							>
								Browse All Resources
							</Link>
						</div>
					</AnimatePosition>
				</div>
			</div>
		</section>
	)
}
