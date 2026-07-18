import type { Project } from "./project.contract.types"

export const PROJECTS_MOCK_DATA: Project[] = [
  {
    id: "new-church-building",
    title: "Give a new church their own building.",
    story:
      "For decades, the Fundamental Baptist Church International has been a beacon of hope. This project represents our commitment to expanding that light. The new church building will house a spacious sanctuary, 12 new classrooms, a multi-purpose fellowship hall, and a media center for global broadcast.\n\nWe are humbled by the generous support that has brought us this far. This sanctuary is more than bricks and mortar; it is a vessel for the Gospel to reach the ends of the earth. Every gift brings us closer to providing a permanent home for worship, discipleship, and community outreach in this growing region.",
    image: "/images/projects/new-church-building.avif",
    galleryImages: [
      "/images/projects/new-church-building.avif",
      "/images/projects/finish-walls-and-floor-for-church.avif",
      "/images/projects/mission-house.avif",
      "/images/projects/village-outreach-tricycle.avif",
    ],
    videoUrl:
      "https://video.wixstatic.com/video/0b8760_26160201b19641098748b8e71ecc494c/1080p/mp4/file.mp4",
    funded: 45000,
    goal: 60000,
    status: "ongoing",
    completionDate: "Jun 2026",
    paymentLink:
      "https://forms.ministryforms.net/viewForm.aspx?formid=a34d9627-7270-4588-8d7e-76076e859003&direct-link=true&embed=true&frameid=6520757757407035",
  },
  {
    id: "finish-walls-and-floor-for-church",
    title: "Finish Walls and Floor for Church",
    story:
      "The walls and floors of our church building remain unfinished, limiting our ability to gather comfortably for worship and ministry. This project will complete the plastering, flooring, and painting to transform our shell of a building into a beautiful sanctuary.\n\nA finished church building not only honors God with excellence but also serves as a witness to our community. When completed, this facility will host Sunday services, midweek Bible studies, youth programs, and community events that draw people to the Gospel.",
    image: "/images/projects/finish-walls-and-floor-for-church.avif",
    galleryImages: [
      "/images/projects/finish-walls-and-floor-for-church.avif",
      "/images/projects/new-church-building.avif",
      "/images/projects/mission-house.avif",
      "/images/projects/village-outreach-tricycle.avif",
    ],
    videoUrl: "",
    funded: 32000,
    goal: 80000,
    status: "ongoing",
    completionDate: "Dec 2026",
    paymentLink:
      "https://forms.ministryforms.net/viewForm.aspx?formid=e05e2938-e76b-4f38-9a2f-c5c6fe01c01a&direct-link=true&embed=true&frameid=5090822660640318",
  },
  {
    id: "mission-house",
    title: "Help strengthen village evangelism",
    story:
      "Village evangelists in West Africa labor tirelessly, often without a place to call home. They travel long distances on foot or bicycle, sleeping in makeshift shelters. A mission house provides a permanent base for these faithful servants of God.\n\nThis mission house will include living quarters for the evangelist and his family, a small meeting room for Bible studies, and storage for literature and supplies. It is a strategic investment in the spread of the Gospel in unreached areas.",
    image: "/images/projects/mission-house.avif",
    galleryImages: [
      "/images/projects/mission-house.avif",
      "/images/projects/village-outreach-tricycle.avif",
      "/images/projects/new-church-building.avif",
      "/images/projects/finish-walls-and-floor-for-church.avif",
    ],
    videoUrl: "",
    funded: 23000,
    goal: 25000,
    status: "ongoing",
    completionDate: "Mar 2026",
    paymentLink:
      "https://forms.ministryforms.net/viewForm.aspx?formid=78669205-bb64-4111-be3a-57f7e6d8a5f3&direct-link=true&embed=true&frameid=33660590572772486",
  },
  {
    id: "village-outreach-tricycle",
    title: "Village Outreach",
    story:
      "Many villages in our region are connected by rugged dirt roads that are impassable by standard vehicles during the rainy season. A sturdy motorized tricycle can navigate these roads and carry evangelists, literature, and supplies to communities that rarely hear the Gospel.\n\nThis tricycle will serve as a mobile ministry platform, enabling our team to visit multiple villages each week, distribute tracts, hold outdoor meetings, and follow up with new believers. It is a simple but transformational tool for gospel outreach.",
    image: "/images/projects/village-outreach-tricycle.avif",
    galleryImages: [
      "/images/projects/village-outreach-tricycle.avif",
      "/images/projects/mission-house.avif",
      "/images/projects/new-church-building.avif",
      "/images/projects/finish-walls-and-floor-for-church.avif",
    ],
    videoUrl: "",
    funded: 23000,
    goal: 25000,
    status: "ongoing",
    completionDate: "Apr 2026",
    paymentLink:
      "https://forms.ministryforms.net/viewForm.aspx?formid=e05e2938-e76b-4f38-9a2f-c5c6fe01c01a&direct-link=true&embed=true&frameid=2823283372316159",
  },
  {
    id: "hacwa-campus-expansion",
    title: "HACWA Campus Expansion",
    story:
      "The HACWA campus has grown beyond its original capacity. This project will fund the construction of a new theological library and two additional lecture halls to accommodate our expanding student body in Ghana.",
    image: "/images/projects/new-church-building.avif",
    galleryImages: [
      "/images/projects/new-church-building.avif",
      "/images/projects/finish-walls-and-floor-for-church.avif",
    ],
    videoUrl: "",
    funded: 125000,
    goal: 125000,
    status: "funded",
    completionDate: "Jan 2026",
    paymentLink: "",
  },
  {
    id: "kumasi-community-well",
    title: "Kumasi Community Well",
    story:
      "Providing sustainable clean water access to over 300 families while establishing a new mission station in the heart of the village. This well serves as both a practical resource and a testimony of God's provision.",
    image: "/images/projects/mission-house.avif",
    galleryImages: [
      "/images/projects/mission-house.avif",
      "/images/projects/village-outreach-tricycle.avif",
    ],
    videoUrl: "",
    funded: 18500,
    goal: 18500,
    status: "funded",
    completionDate: "Nov 2025",
    paymentLink: "",
  },
  {
    id: "gospel-radio-broadcast",
    title: "Gospel Radio Broadcast",
    story:
      "Acquisition of professional broadcasting equipment to expand our reach to millions through terrestrial and digital radio. The Gospel message now reaches communities that have never had access to Biblical teaching.",
    image: "/images/projects/village-outreach-tricycle.avif",
    galleryImages: [
      "/images/projects/village-outreach-tricycle.avif",
      "/images/projects/mission-house.avif",
    ],
    videoUrl: "",
    funded: 42000,
    goal: 42000,
    status: "funded",
    completionDate: "Sep 2025",
    paymentLink: "",
  },
]
