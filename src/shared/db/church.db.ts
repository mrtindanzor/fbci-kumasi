import { BRANDING } from "@/shared/constants"
import type { ChurchInfo } from "./church.db.types"

export const CHURCH_INFO: ChurchInfo = {
	name: BRANDING.name,
	tagline:
		"A modern sanctuary dedicated to transformative worship and global impact.",
	description:
		"A modern sanctuary for spiritual growth, fellowship, and community service.",
	address: "GhanaPost GPS: AK-165-9396",
	phone: "+233 00 000 0000",
	email: "info@houseanderson.org",
	serviceTimes: [
		{
			day: "Sunday Morning",
			time: "9:45 AM",
		},
		{
			day: "Sunday Evening",
			time: "6:00 PM",
		},
		{
			day: "Wednesday Evening",
			time: "7:00 PM",
		},
	],
	socials: {
		facebook: "https://facebook.com/houseanderson",
		youtube: "https://youtube.com/houseanderson",
		email: "mailto:info@houseanderson.org",
	},
	giving: "*711*123#",
	pastor: {
		name: "Dr. Pastor Ted Speer ",
		image: "/images/leaders/dr-pastor-ted-speer-and-wife.avif",
		profile: ["F.B.M.I Profile", "https://www.fbmi.org/missionary/speer"],
		role: "Senior Pastor",
	},
}
