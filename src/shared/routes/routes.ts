export const routes = Object.freeze({
  home: "/",
  about: "/about",
  conferences: "/conferences",
  ministries: "/ministries",
  projects: {
    home: "/projects",
    projectById: (id: string) => `/projects/project/${id}` as const,
    projectByIdAndGive: (id: string) => `/projects/project/${id}#give` as const,
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
  auth: {
    login: "/auth/dashboard/signin",
    signup: "/auth/dashboard/signup",
    forgotPassword: "/auth/dashboard/forgot-password",
    resetPassword: "/auth/dashboard/reset-password",
  },
  dashboard: {
    home: "/dashboard",
    projects: {
      home: "/dashboard/projects",
      new: "/dashboard/projects/new",
      editById: (id: string) => `/dashboard/projects/edit/${id}` as const,
    },
  },
} as const)

export type Routes = (typeof routes)[keyof typeof routes]
