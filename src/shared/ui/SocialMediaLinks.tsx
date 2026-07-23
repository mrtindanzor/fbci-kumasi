import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa"
import { SiRumble } from "react-icons/si"
import { CHURCH_INFO } from "../db"
import { Link } from "./primitives/button"

const links = [
  {
    icon: FaFacebook,
    link: CHURCH_INFO.socials.facebook,
    color: "text-blue-500",
    title: "Facebook",
  },
  {
    icon: FaInstagram,
    link: CHURCH_INFO.socials.instagram,
    color: "text-red-800",
    title: "Instagram",
  },
  {
    icon: FaTwitter,
    link: CHURCH_INFO.socials.twitter,
    color: "text-blue-500",
    title: "X (Twitter)",
  },
  {
    icon: FaYoutube,
    link: CHURCH_INFO.socials.youtube,
    color: "text-red-600",
    title: "YouTube",
  },
  {
    icon: SiRumble,
    link: CHURCH_INFO.socials.rumble,
    color: "text-green-700",
    title: "Rumble",
  },
]

export const SocialMediaLinks = () => {
  return (
    <ul className="flex w-fit gap-x-3 items-center">
      {links.map((link) => {
        const Icon = link.icon
        return (
          <li key={link.link}>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              variant="none"
              size="none"
              href={link.link}
              className={link.color}
            >
              <Icon className="size-6" />
            </Link>
            <span className="sr-only">{link.title}</span>
          </li>
        )
      })}
    </ul>
  )
}
