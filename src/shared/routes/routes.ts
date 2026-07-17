export const routes = Object.freeze({
	home: "/",
	about: "/about",
	conferences: "/conferences",
	ministries: "/ministries",
	projects: {
		home: "/projects",
		projectById: (id: string) => `/projects/project/${id}` as const,
		funded: "/projects/funded",
	},
	pastor: {
		home: "/pastor",
		biography: "/pastor#biography",
	},
	college: "/college",
	heaven: "/heaven",
	contact: "/contact",
	resources: {
		home: "/resources",
		lessons: "/resources/discipleship",
		discipleship: "/resources#discipleship-lesson-books",
		sermon: "/resources#sermons",
		youtube: "/resources#youtube",
		music: "/resources#music",
	},
	donate: {
		home: "/donate",
		overseas: "/donate#overseas",
		local: "/donate#local",
	},
	churches: "/churches",
} as const)

export type Routes = (typeof routes)[keyof typeof routes]
