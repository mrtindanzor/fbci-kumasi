import { Mail, Phone } from "lucide-react"
import { FaFacebook } from "react-icons/fa"
import { CHURCH_INFO } from "@/shared/db"

export const contactOptions = [
  {
    icon: Phone,
    label: "Call Us",
    href: `tel:${CHURCH_INFO.phone}`,
    external: false,
  },
  {
    icon: Mail,
    label: "Email Us",
    href: `mailto:${CHURCH_INFO.socials.email}`,
    external: false,
  },
  {
    icon: FaFacebook,
    label: "Facebook",
    href: CHURCH_INFO.socials.facebook,
    external: true,
  },
]
