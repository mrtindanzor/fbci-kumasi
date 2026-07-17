import { motion } from "framer-motion"
import { AnimatePosition, slideUp, staggerContainer } from "@/shared/ui/Framer"

const CATEGORIES = [
	"Sermons",
	"YouTube",
	"Music",
	"Lesson Books",
	"PDF Library",
] as const

type ResourceItem = {
	id: string
	title: string
	description: string
	icon: string
	type: string
	size: string
}

const RESOURCES: ResourceItem[] = [
	{
		id: "walking-in-spirit",
		title: "Walking in the Spirit",
		description:
			"A foundational study on the daily life of a believer, focusing on Galatians 5.",
		icon: "description",
		type: "PDF",
		size: "1.2 MB",
	},
	{
		id: "hermeneutics-intro",
		title: "Hermeneutics I: Introduction",
		description:
			"Official HACWA course materials for foundational biblical interpretation techniques.",
		icon: "menu_book",
		type: "eBook",
		size: "4.5 MB",
	},
	{
		id: "hymns-faithful",
		title: "Hymns of the Faithful",
		description:
			"A curated digital collection of classical hymns performed by the FBCI choir.",
		icon: "music_note",
		type: "MP3",
		size: "156 MB",
	},
	{
		id: "church-history",
		title: "Church History Study Guide",
		description:
			"Comprehensive overview of the development of the Baptist church through the ages.",
		icon: "folder_zip",
		type: "Zip",
		size: "22 MB",
	},
	{
		id: "missions-evangelism",
		title: "Missions & Evangelism",
		description:
			"Practical guides for cross-cultural outreach and local soul-winning strategies.",
		icon: "description",
		type: "PDF",
		size: "800 KB",
	},
	{
		id: "christian-ethics",
		title: "Christian Ethics in Modernity",
		description:
			"A philosophical and biblical approach to navigating contemporary social issues.",
		icon: "picture_as_pdf",
		type: "PDF",
		size: "3.2 MB",
	},
]

export function ResourceLibrary() {
	return (
		<section className="section-gap bg-surface-container">
			<div className="container-app">
				<AnimatePosition variants={slideUp}>
					<div className="flex flex-wrap items-center gap-3 mb-8">
						{CATEGORIES.map((cat) => (
							<button
								key={cat}
								type="button"
								className="px-4 py-2 text-sm font-label uppercase tracking-wider rounded-full border border-outline-variant text-on-surface-variant hover:border-secondary hover:text-secondary transition-colors"
							>
								{cat}
							</button>
						))}
						<button
							type="button"
							className="ml-auto text-on-surface-variant"
							aria-label="Search"
						>
							<span className="material-symbols-outlined">search</span>
						</button>
					</div>
				</AnimatePosition>

				<motion.ul
					variants={staggerContainer}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true }}
					className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
				>
					{RESOURCES.map((item) => (
						<motion.li
							key={item.id}
							variants={slideUp}
							className="bg-surface rounded-xl p-6 border border-outline-variant group/resource"
						>
							<span className="material-symbols-outlined text-3xl text-secondary mb-3 block">
								{item.icon}
							</span>
							<h3 className="font-headline font-semibold text-primary mb-2">
								{item.title}
							</h3>
							<p className="text-sm text-on-surface-variant mb-4 line-clamp-2">
								{item.description}
							</p>
							<div className="flex items-center justify-between text-xs text-on-surface-variant">
								<span>
									{item.type} &middot; {item.size}
								</span>
								<button
									type="button"
									className="inline-flex items-center gap-1 text-secondary font-semibold hover:gap-2 transition-all"
								>
									Download
									<span className="material-symbols-outlined text-base">
										download
									</span>
								</button>
							</div>
						</motion.li>
					))}
				</motion.ul>

				<div className="text-center mt-10">
					<button
						type="button"
						className="px-8 py-3 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-primary hover:text-white transition-colors"
					>
						Load More Resources
					</button>
				</div>
			</div>
		</section>
	)
}
