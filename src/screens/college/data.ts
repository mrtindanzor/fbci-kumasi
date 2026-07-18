import { BRANDING } from "@/shared/constants"
import type { CollegeData } from "./data.types"

export const collegeData: CollegeData = {
	name: BRANDING.college.name,
	tagline: "Equipping the Next Generation of Spiritual Leaders",
	prospectus: {
		title: "HACWA Official Prospectus",
		description:
			"Complete guide to programs, courses, faculty, academic schedule, and church contact information.",
		url: "/files/hacwa/hacwa-summary-info.pdf",
	},
	whatsInside: [
		{
			title: "About the College",
			icon: "school",
			description:
				"Learn about our mission, history, and vision for training ministry leaders.",
		},
		{
			title: "Programs",
			icon: "auto_stories",
			description:
				"Explore the academic programs and courses we offer at HACWA.",
		},
		{
			title: "Diploma Courses",
			icon: "menu_book",
			description:
				"Browse our diploma-level course offerings and curriculum details.",
		},
		{
			title: "Academic Schedule",
			icon: "schedule",
			description: "View the academic timetable and important calendar dates.",
		},
		{
			title: "Faculty",
			icon: "groups",
			description:
				"Meet our qualified and dedicated faculty members and instructors.",
		},
		{
			title: "Church Contact",
			icon: "church",
			description:
				"Find contact details, location information, and service times.",
		},
	],
}
