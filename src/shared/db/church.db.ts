import { BRANDING } from "@/shared/constants"
import type { ChurchInfo } from "./church.db.types"

export const CHURCH_INFO: ChurchInfo = {
	name: BRANDING.name,
	tagline:
		"A modern sanctuary dedicated to transformative worship and global impact.",
	description:
		"A modern sanctuary for spiritual growth, fellowship, and community service.",
	address: {
		gpa: "GhanaPost GPS: AK-165-9396",
		poBox: `
        P.O. Box KS 16994
        Adum, Kumasi, Ghana
        `,
	},
	phone: "+233544352810",
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
		email: "fbcikumasi@gmail.com",
	},
	giving: "*713*2810#",
	pastor: {
		name: "Dr. Pastor Ted Speer ",
		image: "/images/leaders/dr-pastor-ted-speer-and-wife.avif",
		profile: ["F.B.M.I Profile", "https://www.fbmi.org/missionary/speer"],
		role: "Senior Pastor",
	},
	donationLink:
		"https://forms.ministryforms.net/viewForm.aspx?formid=4acd952d-1877-4a34-8cf1-b236e92ec5cb&direct-link=&embed=true&frameid=726864893714642",
}
