export const apiRoutes = Object.freeze({
	auth: {
		login: {
			path: "/auth/login",
			method: "post",
		},
		logout: {
			path: "/auth/logout",
			method: "post",
		},
		refresh: {
			path: "/auth/refresh",
			method: "get",
		},
		signup: {
			path: "/auth/signup",
			method: "post",
		},
	},
	projects: {
		list: {
			path: "/projects",
			method: "get",
		},
		byId: (id: string) => ({
			path: `/projects/${id}` as const,
			method: "get" as const,
		}),
	},
} as const)
