import { routes } from "@/shared/routes"

export const NAV_LINKS = [
	{ label: "Home", href: routes.home },
	{ label: "Heaven", href: routes.heaven },
	{ label: "About", href: routes.about },
	{ label: "Pastor", href: routes.pastor.home },
	{ label: "Conferences", href: routes.conferences },
	{ label: "Ministries", href: routes.ministries },
	{ label: "Resources", href: routes.resources.home },
	{ label: "Churches", href: routes.churches },
	{ label: "Contact", href: routes.contact },
	{ label: "College", href: routes.college },
	{ label: "Donate", href: routes.donate.home },
] as const

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
