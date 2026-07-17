import type { Project } from "@/screens/projects/data.types"
import { routes } from "@/shared/routes"
import { AnimatePosition, slideUp } from "@/shared/ui/Framer"
import { Link } from "@/shared/ui/primitives/button"

type SupportSectionProps = {
	project: Project
}

export function SupportSection({ project }: SupportSectionProps) {
	return (
		<section
			id="give-to-this-project"
			className="section-gap bg-surface-container"
		>
			<div className="container-app max-w-3xl mx-auto text-center">
				<AnimatePosition variants={slideUp}>
					<h2 className="font-h2 text-h2 text-primary mb-4">
						Support This Mission
					</h2>
					<p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-xl mx-auto">
						Your sacrificial giving directly impacts this project and the future
						of West African ministries.
					</p>

					<div className="bg-surface-container-lowest rounded-2xl p-8 md:p-12 text-left space-y-6 border border-outline-variant shadow-sm">
						<span className="material-symbols-outlined text-4xl text-secondary">
							payments
						</span>
						<h3 className="font-h4 text-h4 text-primary">Make a Donation</h3>

						<div className="flex flex-wrap gap-3">
							{["$50", "$100", "$500", "$1000"].map((amount) => (
								<button
									key={amount}
									type="button"
									className="px-6 py-3 border-2 border-outline-variant rounded-xl font-semibold text-on-surface hover:border-secondary hover:text-secondary transition-colors"
								>
									{amount}
								</button>
							))}
						</div>

						<div className="flex items-center gap-3 text-sm text-on-surface-variant">
							<span className="material-symbols-outlined text-lg">lock</span>
							Secure encrypted transaction
						</div>

						<Link
							href={`${routes.donate}?project=${project.id}`}
							variant="primary"
							size="lg"
							className="w-full"
						>
							Proceed to Giving
						</Link>

						{project.status === "funded" && (
							<p className="text-center text-sm text-secondary font-semibold mt-2">
								This project is fully funded. Your gift will support ongoing
								ministry needs.
							</p>
						)}
					</div>
				</AnimatePosition>
			</div>
		</section>
	)
}
