import { routes } from "@/shared/routes"

type Category = {
  name: string
  url: string
}

export const CATEGORIES: Category[] = [
  { name: "Sermons", url: routes.resources.sermon },
  { name: "YouTube", url: routes.resources.youtube },
  { name: "Music", url: routes.resources.music },
  { name: "Discipleship", url: routes.resources.discipleship },
] as const
