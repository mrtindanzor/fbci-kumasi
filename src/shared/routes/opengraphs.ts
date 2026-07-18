const graphs = Object.freeze({
  home: "home.png",
  about: "about.png",
  contact: "contact.png",
  projects: "projects.png",
  ministries: "ministries.png",
  heaven: "heaven.png",
  donate: "donate.png",
  resources: "resources.png",
  college: "college.png",
  pastor: "pastor.png",
  churches: "churches.png",
} as const)

export type Opengraphs = typeof graphs

export const opengraphs = {
  select: <T extends keyof Opengraphs>(graph: T) =>
    `/images/opengraphs/${graphs[graph]}` as const,
} as const
