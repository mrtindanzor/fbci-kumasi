import { AnimatePosition, slideUp } from "@/shared/ui/Framer"

const features = [
	{
		icon: "check_circle",
		title: "Foundational Scriptures",
		description: "A collection of verses detailing the path to heaven.",
	},
	{
		icon: "check_circle",
		title: "Practical Next Steps",
		description: "Guidance on how to grow in your new faith daily.",
	},
]

export function DownloadSection() {
	return (
		<section className="section-gap">
			<div className="container-app">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
					<AnimatePosition variants={slideUp}>
						<h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-6">
							Equip Your Journey
						</h2>
						<div className="space-y-4">
							{features.map((feature) => (
								<div key={feature.title} className="flex items-start gap-3">
									<span className="material-symbols-outlined text-secondary mt-0.5">
										{feature.icon}
									</span>
									<div>
										<p className="font-semibold text-primary">
											{feature.title}
										</p>
										<p className="text-on-surface-variant text-sm">
											{feature.description}
										</p>
									</div>
								</div>
							))}
						</div>
					</AnimatePosition>

					<AnimatePosition variants={slideUp}>
						<div className="bg-surface-container rounded-2xl p-8 border border-outline-variant/30">
							<div className="flex items-center gap-3 mb-4">
								<span className="material-symbols-outlined text-3xl text-secondary">
									description
								</span>
								<div>
									<p className="text-xs text-on-surface-variant uppercase tracking-wider">
										The Gift
									</p>
									<p className="font-headline font-semibold text-primary">
										Official Salvation Guide
									</p>
								</div>
							</div>

							<div className="bg-surface rounded-xl p-4 border border-outline-variant/30">
								<p className="font-semibold text-primary text-sm">
									Salvation PDF
								</p>
								<p className="text-on-surface-variant text-xs mb-3">
									Download our 12-page guide on finding eternal peace. Includes
									prayer guides and scripture maps.
								</p>
								<div className="flex items-center justify-between">
									<a
										download
										href="/files/are-you-saved-booklet.pdf"
										target="_blank"
										rel="noopener"
										type="button"
										className="inline-flex items-center gap-2 text-secondary font-semibold text-sm hover:underline"
									>
										<span className="material-symbols-outlined text-lg">
											download
										</span>
										Download Guide
									</a>
									<span className="text-xs text-on-surface-variant">
										PDF Format • 4.2 MB • Free Access
									</span>
								</div>
							</div>
						</div>
					</AnimatePosition>
				</div>
			</div>
		</section>
	)
}
