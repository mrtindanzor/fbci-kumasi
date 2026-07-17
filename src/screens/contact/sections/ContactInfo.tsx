import { CHURCH_INFO } from "@/shared/db"
import { AnimatePosition, slideUp } from "@/shared/ui/Framer"

export function ContactInfo() {
	return (
		<section className="section-gap bg-surface-container">
			<div className="container-app">
				<AnimatePosition variants={slideUp}>
					<div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
						<div className="bg-surface rounded-xl p-6 border border-outline-variant text-center">
							<span className="material-symbols-outlined text-3xl text-secondary mb-3 block">
								location_on
							</span>
							<h3 className="font-headline font-semibold text-primary mb-2">
								Mailing Address
							</h3>
							<p className="text-sm text-secondary mt-1">
								<b>{CHURCH_INFO.address.poBox}</b>{" "}
								<span className="text-on-surface">(Works Internationally)</span>
							</p>
							<p className="text-sm text-secondary mt-1">
								<b>{CHURCH_INFO.address.gpa}</b>{" "}
								<span className="text-on-surface">(Works Locally)</span>
							</p>
						</div>

						<div className="bg-surface rounded-xl p-6 border border-outline-variant text-center">
							<span className="material-symbols-outlined text-3xl text-secondary mb-3 block">
								call
							</span>
							<h3 className="font-headline font-semibold text-primary mb-2">
								Phone
							</h3>
							<p className="text-sm text-on-surface-variant">
								{CHURCH_INFO.phone}
							</p>
						</div>

						<div className="bg-surface rounded-xl p-6 border border-outline-variant text-center">
							<span className="material-symbols-outlined text-3xl text-secondary mb-3 block">
								mail
							</span>
							<h3 className="font-headline font-semibold text-primary mb-2">
								Email
							</h3>
							<p className="text-sm text-on-surface-variant">
								{CHURCH_INFO.socials.email}
							</p>
						</div>
					</div>
				</AnimatePosition>
			</div>
		</section>
	)
}
