import { routes } from "@/shared/routes"
import { AnimatePosition, slideUp } from "@/shared/ui/Framer"
import { Link } from "@/shared/ui/primitives/button"

const SUPPORT_AREAS = [
	{
		icon: "engineering",
		title: "Facility Maintenance",
		description:
			"Ensuring our physical campuses remain clean, safe, and functional for all students and congregants.",
	},
	{
		icon: "school",
		title: "Scholarship Fund",
		description:
			"Helping students at HACWA cover tuition and living expenses as they prepare for full-time ministry.",
	},
] as const

const AMOUNTS = ["$25", "$50", "$100"]

export function OngoingSupport() {
	return (
		<section className="section-gap bg-surface-container">
			<div className="container-app">
				<AnimatePosition variants={slideUp}>
					<div className="max-w-3xl mx-auto text-center mb-12">
						<h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-4">
							Sustaining the Legacy: Ongoing Support
						</h2>
						<p className="text-on-surface-variant">
							While these specific project goals have been met, the mission
							continues. Ongoing support covers maintenance, staffing, and
							operational costs to ensure these facilities serve the kingdom for
							generations to come.
						</p>
					</div>
				</AnimatePosition>

				<div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-12">
					{SUPPORT_AREAS.map((area) => (
						<AnimatePosition key={area.title} variants={slideUp}>
							<div className="bg-surface rounded-xl p-6 border border-outline-variant text-center">
								<span className="material-symbols-outlined text-4xl text-secondary mb-3 block">
									{area.icon}
								</span>
								<h3 className="font-headline font-semibold text-primary mb-2">
									{area.title}
								</h3>
								<p className="text-sm text-on-surface-variant">
									{area.description}
								</p>
							</div>
						</AnimatePosition>
					))}
				</div>

				<AnimatePosition variants={slideUp}>
					<div className="max-w-lg mx-auto bg-surface rounded-2xl p-8 border border-outline-variant">
						<h3 className="font-headline font-semibold text-primary text-center mb-6">
							Contribute Monthly
						</h3>
						<p className="text-sm text-on-surface-variant text-center mb-6">
							Set up a recurring gift to sustain these completed projects and
							future initiatives.
						</p>

						<div className="flex flex-wrap justify-center gap-3 mb-6">
							{AMOUNTS.map((amount) => (
								<button
									key={amount}
									type="button"
									className="px-6 py-3 border-2 border-outline-variant rounded-xl font-semibold text-on-surface hover:border-secondary hover:text-secondary transition-colors"
								>
									{amount}
								</button>
							))}
						</div>

						<div className="flex items-center gap-3 text-sm text-on-surface-variant justify-center mb-6">
							<input
								type="checkbox"
								id="recurring"
								className="rounded border-outline-variant"
							/>
							<label htmlFor="recurring">
								Make this a monthly recurring donation
							</label>
						</div>

						<Link
							href={routes.donate.home}
							variant="primary"
							size="lg"
							className="w-full"
						>
							Process Sustaining Gift
						</Link>
						<p className="text-xs text-on-surface-variant text-center mt-4">
							All donations are tax-deductible. Secure 256-bit SSL encrypted
							payment.
						</p>
					</div>
				</AnimatePosition>
			</div>
		</section>
	)
}
