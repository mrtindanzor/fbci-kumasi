import { routes } from "@/shared/routes"

export type NavItem = {
	label: string
	href: string
	children?: NavItem[]
}

export const NAV_ITEMS: NavItem[] = [
	{ label: "Home", href: routes.home },
	{
		label: "About",
		href: routes.about,
		children: [
			{ label: "About", href: routes.about },
			{ label: "Pastor", href: routes.pastor.home },
			{ label: "Churches", href: routes.churches },
		],
	},
	{
		label: "Ministries",
		href: routes.ministries,
		children: [
			{ label: "Ministries", href: routes.ministries },
			{ label: "College", href: routes.college },
			{ label: "Conferences", href: routes.conferences },
		],
	},
	{ label: "Resources", href: routes.resources.home },
	{ label: "Heaven", href: routes.heaven },
	{ label: "Donate", href: routes.donate.home },
	{ label: "Contact", href: routes.contact },
]

export const footerSections = [
	{
		title: "Resources",
		links: [
			{ label: "Sermon Notes", href: routes.resources.home },
			{ label: "Digital Bible", href: routes.resources.home },
			{ label: "Event Calendar", href: routes.resources.home },
			{ label: "Volunteer Hub", href: routes.resources.home },
		],
	},
] as const
