import { BRANDING } from "@/shared/constants"
import type { CollegeData, CollegeResource } from "./data.types"

export const collegeData: CollegeData = {
	name: BRANDING.college.name,
	tagline: "Equipping the Next Generation of Spiritual Leaders",
	stats: [
		{ label: "Courses", value: "50+" },
		{ label: "Ranked Ministry College", value: "#1" },
		{ label: "Students", value: "2,000+" },
	],
}

export const collegeResources: CollegeResource[] = [
	{
		id: "semester-1",
		title: "Semester 1",
		format: "PDF",
		size: "2.4 MB",
		description: "Admissions Flyer 2024",
	},
	{
		id: "prospectus",
		title: "Institutional",
		format: "PDF",
		size: "12 MB",
		description: "College Prospectus",
	},
	{
		id: "conference-schedule",
		title: "Events",
		format: "PDF",
		size: "1.8 MB",
		description: "Conference Schedule",
	},
]
