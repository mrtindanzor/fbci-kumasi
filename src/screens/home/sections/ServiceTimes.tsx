import { church, type ServiceTime } from "@/shared/db"
import { AnimatePosition, slideUp } from "@/shared/ui/Framer"

export function ServiceTimes() {
	return (
		<section className="section-gap">
			<div className="container-app">
				<AnimatePosition variants={slideUp}>
					<h2 className="text-3xl md:text-4xl font-headline font-bold text-primary text-center mb-4">
						Service Times
					</h2>
					<p className="text-on-surface-variant text-center max-w-xl mx-auto mb-12">
						Find a time that fits your schedule and join our community in
						fellowship.
					</p>
				</AnimatePosition>

				<div className="flex flex-wrap gap-6 max-w-4xl mx-auto">
					{church.serviceTimes.map((service, index) => (
						<ServiceTimeCard
							key={service.day}
							service={service}
							index={index}
						/>
					))}
				</div>
			</div>
		</section>
	)
}

type ServiceTimeCardProps = {
	service: ServiceTime
	index: number
}
function ServiceTimeCard({ service, index }: ServiceTimeCardProps) {
	return (
		<AnimatePosition variants={slideUp} className="flex-1 min-w-65">
			<div className="bg-surface-container rounded-2xl p-8 border border-outline-variant/30">
				<div className="flex text-center items-center justify-center gap-3 mb-4">
					<span className="material-symbols-outlined text-3xl text-secondary">
						{index === 0 ? "sunny" : "nightlight"}
					</span>
					<h3 className="text-xl font-headline font-semibold text-primary">
						{service.day}
					</h3>
				</div>
				<p className="text-2xl text-center font-bold text-primary mb-1">
					{service.time}
				</p>
			</div>
		</AnimatePosition>
	)
}
