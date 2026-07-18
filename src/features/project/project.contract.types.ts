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

export type ProjectInput = Omit<Project, "id" | "funded"> & {
  funded?: number
}

export type ProjectFilters = {
  status?: "funded" | "ongoing"
  page?: number
  limit?: number
}

export abstract class IProjectService {
  abstract find(filters?: ProjectFilters): Promise<Project[]>
  abstract findById(id: string): Promise<Project | null>
  abstract create(data: ProjectInput): Promise<Project>
  abstract update(id: string, data: Partial<ProjectInput>): Promise<Project>
  abstract delete(id: string): Promise<void>
}
