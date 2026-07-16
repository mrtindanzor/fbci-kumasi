export const routes = Object.freeze({
	home: "/",
	about: "/about",
	conferences: "/conferences",
	ministries: "/ministries",
	projects: "/projects",
	pastor: "/pastor",
	college: "/college",
	heaven: "/heaven",
} as const)

export type Routes = (typeof routes)[keyof typeof routes]
