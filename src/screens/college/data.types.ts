export type WhatsInsideCard = {
	title: string
	icon: string
	description: string
}

export type CollegeData = {
	name: string
	tagline: string
	prospectus: {
		title: string
		description: string
		url: string
	}
	whatsInside: WhatsInsideCard[]
}
