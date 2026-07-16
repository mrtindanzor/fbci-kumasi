export type Project = {
	id: string
	title: string
	category: string
	description: string
	funded: number
	goal: number
	progressPercent: number
	status: "funded" | "urgent" | "ongoing"
}
