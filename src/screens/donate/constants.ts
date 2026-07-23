import { Mail, Phone } from "lucide-react"
import { CHURCH_INFO } from "@/shared/db"

export const IMPACTS = [
  {
    icon: "school",
    title: "HACWA Scholarships",
    description:
      "Supporting the next generation of pastors and leaders across West Africa.",
  },
  {
    icon: "church",
    title: "Church Planting",
    description:
      "Establishing fundamental churches in rural and urban communities.",
  },
  {
    icon: "volunteer_activism",
    title: "Community Outreach",
    description:
      "Providing physical and spiritual support to families in need.",
  },
  {
    icon: "menu_book",
    title: "Resource Dev",
    description: "Printing and distributing sound theological literature.",
  },
]

export const CONTACT_OPTIONS = [
  {
    icon: Phone,
    title: "Phone",
    value: CHURCH_INFO.phone,
    link: `tel:${CHURCH_INFO.phone}`,
  },
  {
    icon: Mail,
    title: "Email",
    value: CHURCH_INFO.socials.email,
    link: `mailto:${CHURCH_INFO.socials.email}`,
  },
]
