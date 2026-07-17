import { routes } from "@/shared/routes"

type Category = {
	name: string
	url: string
}

export const CATEGORIES: Category[] = [
	{ name: "Sermons", url: routes.resources.sermon },
	{ name: "YouTube", url: routes.resources.youtube },
	{ name: "Music", url: routes.resources.music },
	{ name: "Discipleship", url: routes.resources.discipleship },
] as const

export type ResourceItem = {
	id: string
	title: string
	description: string
	icon: string
	type: string
	size: string
}

export const RESOURCES: ResourceItem[] = [
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
