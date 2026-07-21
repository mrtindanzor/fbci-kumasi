import type { Conference } from "./data.types"

export const conference: Conference = {
  id: "annual-2025",
  title: "Annual Pastors & Workers Conference",
  subtitle: `Each year in August, we host a Pastors' and Workers' Conference aimed at strengthening, encouraging, and equipping pastors and church workers, along with their members, for more effective ministry. It is always a time of spiritual growth, fellowship, and renewal.

We are pleased to invite you to be part of this year's conference.`,
  poster: "/images/anual-conference.avif",
  theme: "Biblical Prosperity",
  schedule: "11th - 14th August",
  location: "Fundamental Baptist Church International, Kumasi",
  description: `This year's theme will focus on understanding and applying God's principles for true prosperity.

We would be truly honored to have you attend and be blessed together with us. Kindly make plans to join us for this impactful conference.`,
  closingMessage: "We look forward to welcoming you.",
  resources: [
    {
      id: "poster",
      title: "Conference Poster",
      file: "/files/conference/pastors-and-workers-conference-poster.pdf",
      type: "pdf",
    },
    {
      id: "registration",
      title: "Registration Form",
      file: "/files/conference/pastors-and-workers-conference-registration-form.pdf",
      type: "pdf",
    },
    {
      id: "info-sheet",
      title: "Conference Information Sheet",
      file: "/files/conference/pastors-and-workers-conconference-information-sheet.pdf",
      type: "pdf",
    },
  ],
}
