import { motion } from "framer-motion"
import { AnimatePosition, slideUp, staggerContainer } from "@/shared/ui/Framer"
import { Link } from "@/shared/ui/primitives/button"
import { Image } from "@/shared/ui/primitives/Image"

type Leader = {
	name: string
	role: string
	image: string
	profile: [/*title */ string, /*url*/ string] | null
}

const leaders: Leader[] = [
	{
		name: "Alex & Justina Addo",
		role: "Public Relations Officer, Teacher of the Abundant Life Class",
		image: "/images/leaders/alex-and-justina-addo.avif",
		profile: null,
	},
	{
		name: "Eric Arthur",
		role: "Head of Usher, Teacher of Together Builders",
		image: "images/leaders/eric-auther-and-wife.avif",
		profile: null,
	},
	{
		name: "Micah & Abbie Christiansen",
		role: "Children's Pastor, Headmaster of Fundamental Baptist Academy",
		image: "images/leaders/micah-and-abbie-christiansen.avif",
		profile: [
			"F.B.M.I Profile",
			"https://www.fbmi.org/missionary/christiansenm",
		],
	},
	{
		name: "Stephen & Rhoda Opoku",
		role: "Teen Pastor, Senior High Boys' Teacher",
		image: "images/leaders/stephen-and-rhoda.avif",
		profile: null,
	},
	{
		name: "Charles & Lindsey Osgood",
		role: "Singles Pastor, Choir Director, Teacher the of Difference Makers Class",
		image: "images/leaders/charles-and-lindsey-osgood.avif",
		profile: [
			"F.B.M.I Profile",
			"https://www.fbmi.org/missionary/osgood?portfolioCats=1292%2C627%2C635%2C626",
		],
	},
	{
		name: "Micheal & Abigail Sakyi",
		role: "Media Director, Teacher of the Gap Fillers Class",
		image: "images/leaders/michael-and-abigial-sakyi.avif",
		profile: null,
	},
	{
		name: "Mike & Maria Sarver",
		role: "Associate Pastor, Teacher of the Common Faith Class",
		image: "images/leaders/mike-and-maria-sarver.avif",
		profile: [
			"F.B.M.I Profile",
			"https://www.fbmi.org/missionary/osgood?portfolioCats=1292%2C627%2C635%2C626",
		],
	},
	{
		name: "Emmanuel & Lawrencia Tawiah",
		role: "Financial Secretary, Teacher of the Faith Builders Class",
		image: "images/leaders/emmanuel-and-lawrencia-tawiah.avif",
		profile: null,
	},
]

export function Leadership() {
	return (
		<section className="section-gap">
			<div className="container-app">
				<AnimatePosition variants={slideUp}>
					<div className="mb-12">
						<h2 className="text-lg md:text-2xl font-headline font-bold text-primary mb-2">
							Meet Our Assistant Pastors and Adult Sunday School Teachers
						</h2>
						<p className="text-on-surface-variant">
							The Hearts Behind the Vision
						</p>
					</div>
				</AnimatePosition>

				<motion.div
					variants={staggerContainer}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true }}
					className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-12 max-w-5xl mx-auto"
				>
					{leaders.map((leader) => (
						<LeaderCard key={leader.name} {...leader} />
					))}
				</motion.div>
			</div>
		</section>
	)
}

function LeaderCard({ name, role, image, profile }: Leader) {
	const [profileTitle, profileUrl] = profile ?? []

	return (
		<motion.div variants={slideUp} className="text-center">
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
		</motion.div>
	)
}
