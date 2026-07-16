export const routes = Object.freeze({
	home: "/",
	about: "/about",
	conferences: "/conferences",
	ministries: "/ministries",
	projects: "/projects",
	pastor: "/pastor",
	college: "/college",
	heaven: "/heaven",
	contact: "/contact",
	resources: "/resources",
	donate: "/donate",
	churches: "/churches",
} as const)

export type Routes = (typeof routes)[keyof typeof routes]
