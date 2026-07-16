import { BRANDING } from "@/shared/constants"
import type { ChurchInfo } from "./church.db.types"

export const church: ChurchInfo = {
	name: BRANDING.name,
	tagline:
		"A modern sanctuary dedicated to transformative worship and global impact.",
	description:
		"A modern sanctuary for spiritual growth, fellowship, and community service.",
	address: "GhanaPost GPS: AK-000-0000",
	phone: "+233 00 000 0000",
	email: "info@houseanderson.org",
	serviceTimes: [
		{
			day: "Sunday Worship",
			time: "8:00 AM",
			location: "Main Sanctuary",
			description:
				"Join us for a powerful morning of traditional and contemporary worship.",
		},
		{
			day: "Wednesday Midweek",
			time: "6:00 PM",
			location: "Community Hall",
			description:
				"A deep dive into scripture and intimate prayer sessions for all ages.",
		},
	],
	socials: {
		facebook: "https://facebook.com/houseanderson",
		youtube: "https://youtube.com/houseanderson",
		email: "mailto:info@houseanderson.org",
	},
	giving: "*711*123#",
}
