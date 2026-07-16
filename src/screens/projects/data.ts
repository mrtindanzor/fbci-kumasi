import type { Project } from "./data.types"

export const projects: Project[] = [
	{
		id: "learning-hub",
		title: "The Learning Hub Project",
		category: "Education",
		description:
			"Establishing a digital resource center for underprivileged students to access global educational tools and mentorship.",
		funded: 45000,
		goal: 60000,
		progressPercent: 75,
		status: "ongoing",
	},
	{
		id: "green-sanctuary",
		title: "Green Sanctuary Initiative",
		category: "Sustainability",
		description:
			"Transitioning our campus to 100% renewable energy and implementing community urban farming programs.",
		funded: 32000,
		goal: 80000,
		progressPercent: 40,
		status: "ongoing",
	},
	{
		id: "global-health",
		title: "Global Health Outreach",
		category: "Urgent",
		description:
			"Providing essential medical supplies and clean water access to regional partner communities in need.",
		funded: 23000,
		goal: 25000,
		progressPercent: 92,
		status: "urgent",
	},
]
