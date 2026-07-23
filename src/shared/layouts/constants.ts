import { DOWNLOADS } from "@/shared/constants"
import { routes } from "@/shared/routes"

export type NavItem = {
  label: string
  href: string
  children?: NavItem[]
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: routes.home },
  {
    label: "About",
    href: routes.about,
    children: [
      { label: "About", href: routes.about },
      { label: "Pastor", href: routes.pastor.home },
      { label: "Churches", href: routes.churches },
    ],
  },
  {
    label: "Ministries",
    href: routes.ministries,
    children: [
      { label: "Ministries", href: routes.ministries },
      { label: "College", href: routes.college },
      { label: "Conferences", href: routes.conferences },
    ],
  },
  { label: "Resources", href: routes.resources.home },
  { label: "Heaven", href: routes.heaven },
  { label: "Donate", href: routes.donate.home },
  { label: "Contact", href: routes.contact },
]

export const footerQuickLinks = [
  { label: "Home", href: routes.home },
  { label: "About", href: routes.about },
  { label: "Pastor", href: routes.pastor.home },
  { label: "Ministries", href: routes.ministries },
  { label: "Conferences", href: routes.conferences },
  { label: "Churches", href: routes.churches },
  { label: "College (HACWA)", href: routes.college },
  { label: "Projects", href: routes.projects.home },
  { label: "Donate", href: routes.donate.home },
  { label: "Heaven", href: routes.heaven },
  { label: "Contact", href: routes.contact },
] as const

export const footerResourceLinks = [
  { label: "Sermons", href: routes.resources.sermon },
  { label: "Discipleship Lessons", href: routes.resources.discipleship },
  { label: "Fundamental Hour", href: routes.resources.youtube },
  { label: "Salvation Booklet", href: DOWNLOADS.salvationBooklet },
] as const

export const footerGivingLinks = [
  { label: "Give Online", href: routes.donate.home },
  { label: "Mobile Money", href: routes.donate.local },
  { label: "Donate from USA", href: routes.donate.overseas },
] as const
