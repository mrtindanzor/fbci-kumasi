import { routes } from "@/shared/routes"

export const navLinks = [
	{ label: "Home", href: routes.home },
	{ label: "About", href: routes.about },
	{ label: "Ministries", href: routes.ministries },
	{ label: "Conferences", href: routes.conferences },
	{ label: "Resources", href: routes.resources },
	{ label: "Churches", href: routes.churches },
	{ label: "Contact", href: routes.contact },
] as const

export const mobileNavLinks = [
	{ label: "Home", href: routes.home, icon: "home" },
	{ label: "College", href: routes.college, icon: "school" },
	{ label: "Sermons", href: routes.conferences, icon: "menu_book" },
	{ label: "Heaven", href: routes.heaven, icon: "favorite" },
	{ label: "Contact", href: routes.contact, icon: "contact_support" },
] as const

export const footerSections = [
	{
		title: "Resources",
		links: [
			{ label: "Sermon Notes", href: routes.resources },
			{ label: "Digital Bible", href: routes.resources },
			{ label: "Event Calendar", href: routes.resources },
			{ label: "Volunteer Hub", href: routes.resources },
		],
	},
] as const
