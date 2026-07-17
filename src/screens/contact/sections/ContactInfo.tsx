import { CHURCH_INFO } from "@/shared/db"
import { AnimatePosition, slideUp } from "@/shared/ui/Framer"
import { SocialMediaLinks } from "@/shared/ui/SocialMediaLinks"

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
								Visit Us
							</h3>
							<p className="text-sm text-on-surface-variant">
								123 Faith Avenue, Accra, Ghana
							</p>
							<p className="text-sm text-secondary mt-1">
								{CHURCH_INFO.address}
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

				<AnimatePosition variants={slideUp}>
					<div className="text-center mt-12">
						<h3 className="font-headline font-semibold text-primary mb-4 text-lg">
							Follow Our Journey
						</h3>
						<div className="mx-auto w-fit">
							<SocialMediaLinks />
						</div>
					</div>
				</AnimatePosition>
			</div>
		</section>
	)
}
