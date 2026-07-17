export type ProjectPhase = {
	label: string
	amount: number
	icon: string
	completed: boolean
}

export type Project = {
	id: string
	title: string
	category: string
	description: string
	story: string
	image: string
	galleryImages: string[]
	videoUrl: string
	donorCount: number
	funded: number
	goal: number
	progressPercent: number
	status: "funded" | "urgent" | "ongoing"
	completionDate: string
	tags: string[]
	phases: ProjectPhase[]
	paymentLink: string
}
