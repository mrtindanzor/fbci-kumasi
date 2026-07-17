import type { Project } from "@/screens/projects/data.types"
import { AnimatePosition, slideUp } from "@/shared/ui/Framer"
import { PaymentForm } from "@/shared/ui/primitives/PaymentForm"

type SupportSectionProps = {
	project: Project
}

export function SupportSection({ project }: SupportSectionProps) {
	return (
		<section
			id="give-to-this-project"
			className="section-gap bg-surface-container"
		>
			<div id="give" className="container-app max-w-3xl mx-auto text-center">
				<AnimatePosition variants={slideUp}>
					<h2 className="font-h2 text-h2 text-primary mb-4">
						Support This Mission
					</h2>
					<p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-xl mx-auto">
						Your sacrificial giving directly impacts this project and the future
						of West African ministries.
					</p>

					<PaymentForm
						title={project.title}
						src={project.paymentLink}
						className="h-420 sm:h-325"
					/>
				</AnimatePosition>
			</div>
		</section>
	)
}
