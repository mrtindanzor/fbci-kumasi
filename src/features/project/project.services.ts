import type { FetchDataType } from "@/libs/fetchData"
import { createFetchDataClient } from "@/libs/fetchData"
import type {
  IProjectService,
  Project,
  ProjectFilters,
  ProjectInput,
} from "./project.contract.types"
import { PROJECTS_MOCK_DATA } from "./project.mock-data"

let mockData = structuredClone(PROJECTS_MOCK_DATA)

export class ProjectServiceImpl implements IProjectService {
  constructor(private apiClient: FetchDataType) {}

  async find(filters?: ProjectFilters): Promise<Project[]> {
    void this.apiClient
    // const request = this.apiClient<{ projects: Project[] }>({
    // 	uri: apiRoutes.projects.list.path,
    // 	method: "get",
    // })
    // await request.fetch()
    // if (request.isError()) throw new Error(request.error)
    // return request.data.projects

    let results = [...mockData]

    if (filters?.status) {
      results = results.filter((p) => p.status === filters.status)
    }

    return results
  }

  async findById(id: string): Promise<Project | null> {
    // const request = this.apiClient<Project>({
    // 	uri: apiRoutes.projects.byId(id).path,
    // 	method: "get",
    // })
    // await request.fetch()
    // if (request.isError()) return null
    // return request.data

    return mockData.find((p) => p.id === id) ?? null
  }

  async create(data: ProjectInput): Promise<Project> {
    void this.apiClient
    // const request = this.apiClient<Project>({
    // 	uri: apiRoutes.projects.list.path,
    // 	method: "post",
    // 	body: data,
    // })
    // await request.fetch()
    // if (request.isError()) throw new Error(request.error)
    // return request.data

    const newProject: Project = {
      ...data,
      id: data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, ""),
      funded: data.funded ?? 0,
    }
    mockData.push(newProject)
    return newProject
  }

  async update(id: string, data: Partial<ProjectInput>): Promise<Project> {
    void this.apiClient
    // const request = this.apiClient<Project>({
    // 	uri: apiRoutes.projects.byId(id).path,
    // 	method: "put",
    // 	body: data,
    // })
    // await request.fetch()
    // if (request.isError()) throw new Error(request.error)
    // return request.data

    mockData = mockData.map((p) => {
      if (p.id === id) return { ...p, ...data }
      return p
    })
    const project = mockData.find((p) => p.id === id)
    if (!project) throw new Error("Project not found")

    return { ...project }
  }

  async delete(id: string): Promise<void> {
    void this.apiClient
    // const request = this.apiClient<void>({
    // 	uri: apiRoutes.projects.byId(id).path,
    // 	method: "delete",
    // })
    // await request.fetch()
    // if (request.isError()) throw new Error(request.error)

    mockData = mockData.filter((p) => p.id !== id)
  }
}

export function createProjectService(apiClient: FetchDataType) {
  return new ProjectServiceImpl(apiClient)
}

const apiClient = createFetchDataClient(() => null)
export const projectService = createProjectService(apiClient)
