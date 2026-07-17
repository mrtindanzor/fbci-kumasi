import type { ConferenceResource, RegistrationTier } from "./data.types"

export const conferenceData = {
	title: "The 2024 Global Sanctuary Summit",
	description: `
Each year in August, we host a Pastors' and Workers' Conference aimed at strengthening, encouraging, and equipping pastors and church workers, along with their members, for more effective ministry. It is always a time of spiritual growth, fellowship, and renewal.
We are pleased to invite you to be part of this year's conference.`,
	dates: "Oct 12-14, 2024",
	location: "Main Campus & Streaming",
	stats: [
		{ label: "Raised for community", value: "$2.4M" },
		{ label: "Past Attendees", value: "12k+" },
		{ label: "Countries Represented", value: "45+" },
	],
}

export const conferenceResources: ConferenceResource[] = [
	{
		id: "promo-flyers",
		title: "Promotional Flyers",
		format: "PDF, 12MB",
		size: "4 Variations",
		description: "Promotional Flyers",
	},
	{
		id: "posters",
		title: "Large Scale Posters",
		format: "JPG, 45MB",
		size: "High Res",
		description: "Large Scale Posters",
	},
	{
		id: "registration-forms",
		title: "Registration Forms",
		format: "PDF, 2MB",
		size: "Print Ready",
		description: "Registration Forms",
	},
	{
		id: "logistics-faq",
		title: "Logistics & FAQ",
		format: "DOCX, 1MB",
		size: "2024 Edition",
		description: "Logistics & FAQ",
	},
]

export const registrationTiers: RegistrationTier[] = [
	{
		id: "individual",
		name: "Individual",
		price: 149,
		perPerson: true,
		description: "Register Solo",
	},
	{
		id: "group",
		name: "Group Delegation",
		price: 99,
		perPerson: true,
		description: "Register Group",
	},
]
