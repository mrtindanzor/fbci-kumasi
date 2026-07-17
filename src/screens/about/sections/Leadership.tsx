import { motion } from "framer-motion"
import { CHURCH_INFO } from "@/shared/db"
import { routes } from "@/shared/routes"
import {
	AnimatePosition,
	slideInLeft,
	slideUp,
	staggerContainer,
} from "@/shared/ui/Framer"
import { Link } from "@/shared/ui/primitives/button"
import { Image } from "@/shared/ui/primitives/Image"
import { LEADERS } from "../constants"
import type { Leader } from "../types"

export function Leadership() {
	return (
		<section className="section-gap">
			<div className="container-app">
				<AnimatePosition variants={slideInLeft} className="w-fit mx-auto">
					<h2 className="text-3xl col-span-full text-center md:text-4xl font-headline font-bold mb-4 text-primary">
						Our Pastor
					</h2>
					<ul className="grid grid-cols-1 gap-4 items-center *:*:first:h-70 *:*:first:w-auto">
						<LeaderCard
							name={CHURCH_INFO.pastor.name}
							image={CHURCH_INFO.pastor.image}
							profile={CHURCH_INFO.pastor.profile}
							role={CHURCH_INFO.pastor.role}
						/>
					</ul>
				</AnimatePosition>

				<AnimatePosition variants={slideUp} className="mx-w-sm mx-auto">
					<div className="text-center mt-8 mb-12 px-6 pb-12">
						<p className="text-on-surface-variant mb-4">
							Want to learn more about our pastor&rsquo;s vision, ministry, and
							journey?
						</p>
						<Link
							href={routes.pastor.home}
							variant="primary"
							size="lg"
							className="font-label"
						>
							Visit Pastor&rsquo;s Page
							<span className="material-symbols-outlined text-lg">
								arrow_forward
							</span>
						</Link>
					</div>
				</AnimatePosition>

				<AnimatePosition variants={slideUp}>
					<div className="mb-12">
						<h3 className="text-lg md:text-2xl font-headline font-bold text-primary mb-2">
							Meet Our Assistant Pastors and Adult Sunday School Teachers
						</h3>
						<p className="text-on-surface-variant">
							The Hearts Behind the Vision
						</p>
					</div>
				</AnimatePosition>

				<motion.ul
					variants={staggerContainer}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true }}
					className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-12 max-w-5xl mx-auto"
				>
					{LEADERS.map((leader) => (
						<LeaderCard key={leader.name} {...leader} />
					))}
				</motion.ul>
			</div>
		</section>
	)
}

function LeaderCard({ name, role, image, profile }: Leader) {
	const [profileTitle, profileUrl] = profile ?? []

	return (
		<motion.li variants={slideUp} className="text-center">
			<div className="relative size-50 mx-auto mb-6">
				<Image
					src={image}
					alt={name}
					className="w-full border-4 border-outline-variant/30 rounded-xl overflow-hidden h-full object-cover"
					loading="lazy"
				/>

				{profileTitle && profileUrl && (
					<Link
						href={profileUrl}
						className="w-fit h-fit py-1.5 px-4 left-1/2 -translate-x-1/2 top-full -translate-y-1/2 z-4  absolute text-xs whitespace-nowrap"
						variant="primary"
						target="_blank"
						rel="noopener noreferrer"
					>
						<span className="material-symbols-outlined -rotate-90 text-lg">
							open_in_new_down
						</span>
						<span className="">{profileTitle}</span>
					</Link>
				)}
			</div>
			<h3 className="text-lg font-headline font-semibold text-primary">
				{role}
			</h3>
			<p className="text-on-surface font-medium">{name}</p>
		</motion.li>
	)
}
