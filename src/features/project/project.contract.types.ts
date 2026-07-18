export type Project = {
	id: string
	title: string
	story: string
	image: string
	galleryImages: string[]
	videoUrl: string
	funded: number
	goal: number
	status: "funded" | "ongoing"
	completionDate: string
	paymentLink: string
}

export type ProjectFilters = {
	status?: "funded" | "ongoing"
	page?: number
	limit?: number
}

export abstract class IProjectService {
	abstract find(filters?: ProjectFilters): Promise<Project[]>
	abstract findById(id: string): Promise<Project | null>
}
