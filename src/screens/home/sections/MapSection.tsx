import { CHURCH_INFO } from "@/shared/db"
import { AnimatePosition, slideUp } from "@/shared/ui/Framer"

export function MapSection() {
	return (
		<section className="section-gap">
			<div className="container-app">
				<AnimatePosition variants={slideUp}>
					<div className="flex items-center gap-3 text-on-surface-variant">
						<span className="material-symbols-outlined text-secondary">
							location_on
						</span>
						<p>
							Visit Our Sanctuary in Accra
							<br />
							<span className="text-sm">{CHURCH_INFO.address}</span>
						</p>
						<span className="material-symbols-outlined text-secondary ml-auto">
							church
						</span>
					</div>
				</AnimatePosition>
			</div>
		</section>
	)
}
