export const apiRoutes = Object.freeze({
  auth: {
    login: {
      url: "/auth/signin",
      method: "post",
    },
    logout: {
      url: "/auth/logout",
      method: "post",
    },
    refresh: {
      url: "/auth/refresh",
      method: "get",
    },
    signup: {
      url: "/auth/signup",
      method: "post",
    },
    registration: {
      url: "/auth/registration",
      method: "post",
    },
    forgotPassword: {
      url: "/auth/request-password-reset",
      method: "post",
    },
    resetPassword: {
      url: "/auth/reset-password",
      method: "post",
    },
  },
  projects: {
    list: (filters?: { status?: string }) => {
      const params = new URLSearchParams()
      Object.entries(filters || {}).forEach(([key, value]) => {
        if (value) params.set(key, value)
      })
      const query = params.toString()
      return {
        path: query ? `/projects?${query}` : "/projects",
        method: "get",
      } as const
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
        path: `/images?url=${encodeURIComponent(url)}`,
        method: "delete",
      }) as const,
    projects: {
      path: "/images",
    },
    conferences: {
      path: "/images",
    },
  },
  files: {
    remove: (url: string) =>
      ({
        path: `/files?url=${encodeURIComponent(url)}`,
        method: "delete",
      }) as const,
    conferences: {
      path: "/files",
    },
  },
  contact: {
    new: {
      path: "/contact",
      method: "post",
    },
    find: {
      path: "/contact",
      method: "get",
    },
  },
  conferences: {
    active: {
      path: "/conferences",
      method: "get",
    },
    byId: (id: string) =>
      ({
        path: `/conferences/${id}`,
        method: "get",
      }) as const,
    create: {
      path: "/conferences",
      method: "post",
    },
    update: (id: string) =>
      ({
        path: `/conferences/${id}`,
        method: "patch",
      }) as const,
    delete: (id: string) =>
      ({
        path: `/conferences/${id}`,
        method: "delete",
      }) as const,
  },
  videos: {
    createSession: {
      path: "/videos/upload-session",
      method: "post",
    },
    presignedUrls: {
      path: "/videos/presigned-urls",
      method: "post",
    },
    complete: {
      path: "/videos/complete",
      method: "post",
    },
    abort: {
      path: "/videos/abort",
      method: "post",
    },
    uploadedParts: {
      path: "/videos/uploaded-parts",
      method: "post",
    },
  },
} as const)
