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
    byId: (id: string) =>
      ({
        path: `/projects/${id}`,
        method: "get",
      }) as const,
    create: {
      path: "/projects",
      method: "post",
    },
    update: (id: string) =>
      ({
        path: `/projects/${id}`,
        method: "put",
      }) as const,
    delete: (id: string) =>
      ({
        path: `/projects/${id}`,
        method: "delete",
      }) as const,
  },
  images: {
    remove: (url: string) =>
      ({
        path: `/images/${url}`,
        method: "delete",
      }) as const,
  },
} as const)
