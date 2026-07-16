import { routes } from "@/shared/routes"

export const navLinks = [
	{ label: "Home", href: routes.home },
	{ label: "About", href: routes.about },
	{ label: "Conferences", href: routes.conferences },
	{ label: "Ministries", href: routes.ministries },
	{ label: "Projects", href: routes.projects },
	{ label: "Contact", href: "#contact" },
] as const

export const mobileNavLinks = [
	{ label: "Home", href: routes.home, icon: "home" },
	{ label: "Ministries", href: routes.ministries, icon: "groups" },
	{ label: "College", href: routes.college, icon: "school" },
	{ label: "Sermons", href: routes.conferences, icon: "menu_book" },
	{ label: "Contact", href: "#contact", icon: "contact_support" },
] as const

export const footerSections = [
	{
		title: "Resources",
		links: [
			{ label: "Sermon Notes", href: "#" },
			{ label: "Digital Bible", href: "#" },
			{ label: "Event Calendar", href: "#" },
			{ label: "Volunteer Hub", href: "#" },
		],
	},
	{
		title: "Quick Links",
		links: [
			{ label: "Home", href: routes.home },
			{ label: "About", href: routes.about },
			{ label: "Conferences", href: routes.conferences },
			{ label: "Ministries", href: routes.ministries },
		],
	},
] as const
