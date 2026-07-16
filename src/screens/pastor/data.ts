import { BRANDING } from "@/shared/constants"
import type { PastorData } from "./data.types"

export const pastorData: PastorData = {
	name: "Pastor Samuel Anderson",
	title: "Founder & Lead Shepherd",
	quote:
		"The beauty of the church is not found in its pillars, but in the people who find refuge within them.",
	biography: [
		"Born and raised in the heart of the community, Samuel Anderson's journey began not in a pulpit, but in the quiet service of his neighbors. After graduating with honors from Heritage Seminary, he felt a profound call to return to his roots and establish a ministry that prioritized authentic connection over tradition.",
		`In 1998, with only twelve families, Samuel and his wife Martha founded ${BRANDING.name}. What started as a small gathering in a living room has blossomed into a global sanctuary known for its commitment to social justice, spiritual formation, and international missions.`,
	],
	stats: [
		{ label: "Active Members", value: "3,500+" },
		{ label: "Global Sites", value: "12" },
	],
	timeline: [
		{
			period: "1988 — 1995",
			title: "Early Foundation",
			description:
				"Ministry internship in London followed by a return to serve as a youth pastor, focusing on urban restoration projects.",
			icon: "foundation",
		},
		{
			period: "1998 — 2010",
			title: `The Launch of ${BRANDING.name}`,
			description:
				"Founding the main campus with a mission to bridge social divides and create a modern liturgical experience.",
			icon: "church",
		},
		{
			period: "2012 — Present",
			title: "Global Expansion",
			description:
				"Establishing international missions and satellite campuses across West Africa and Europe.",
			icon: "public",
		},
	],
	credentials: [
		{ icon: "school", text: "Masters in Divinity, Heritage Seminary" },
		{ icon: "public", text: "Global Mission Strategist" },
	],
}
