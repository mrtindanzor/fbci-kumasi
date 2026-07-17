import { FEATURED_MINISTRIES, type Ministry as MinistryType } from "@/shared/db"
import { AnimatePosition, motionVariants } from "@/shared/ui/Framer"
import { Link } from "@/shared/ui/primitives/button"
import { Image } from "@/shared/ui/primitives/Image"

export function FeaturedMinistry() {
	return (
		<section className="px-margin-mobile md:px-margin-desktop py-3xl">
			<ul className="grid h-fit gap-y-40 py-20">
				{FEATURED_MINISTRIES.map((ministry, index) => (
					<Ministry key={ministry.name} ministry={ministry} index={index} />
				))}
			</ul>
		</section>
	)
}

type MinistryProps = { ministry: MinistryType; index: number }
function Ministry({
	ministry: { name, description, cta, image, schedule },
	index,
}: MinistryProps) {
	return (
		<li className="grid grid-cols-1 lg:grid-cols-2 lg:even:*:last:row-start-1 lg:even:*:last:col-start-1  gap-gutter max-w-6xl mx-auto">
			<AnimatePosition
				variants={motionVariants({
					hidden: { opacity: 0, x: index % 2 === 0 ? 50 : -50 },
					show: { opacity: 1, x: 0 },
				})}
			>
				<Image
					src={image}
					alt={name}
					className="w-full lg:h-100 rounded-2xl shadow-md object-top-right aspect-video "
				/>
			</AnimatePosition>
			<AnimatePosition
				variants={motionVariants({
					hidden: { opacity: 0, x: 50 },
					show: { opacity: 1, x: 0 },
				})}
				className="grid h-fit"
			>
				<h2 className="mt-2 font-bold text-h3 md:text-h2">{name}</h2>
				{schedule && (
					<ul className="grid gap-y-1.5 h-fit mt-1">
						{schedule.map((time) => (
							<li
								key={time}
								className="flex items-center gap-2 text-sm opacity-80"
							>
								<span className="material-symbols-outlined">schedule</span>
								{time}
							</li>
						))}
					</ul>
				)}
				<p className="mt-4 opacity-90 leading-relaxed">{description}</p>

				{cta?.map(([title, url]) => (
					<Link
						key={url}
						href={url}
						variant="primary"
						size="lg"
						className="mt-6 w-fit font-label  hover:bg-secondary/90 inline-flex items-center gap-xs"
					>
						{title}
						<span className="material-symbols-outlined">arrow_forward</span>
					</Link>
				))}
			</AnimatePosition>
		</li>
	)
}
