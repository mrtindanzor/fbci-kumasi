import type { FetchDataType } from "@/libs/fetchData"
import { createFetchDataClient } from "@/libs/fetchData"
import { apiRoutes } from "@/shared/routes/apiRoutes"
import type {
  IProjectService,
  Project,
  ProjectFilters,
  ProjectInput,
} from "./project.contract.types"

export class ProjectServiceImpl implements IProjectService {
  constructor(private apiClient: FetchDataType) {}

  async find(filters?: ProjectFilters): Promise<Project[]> {
    const { method, path } = apiRoutes.projects.list(filters)
    const request = this.apiClient<{
      data: Project[]
      nextpage: number | null
    }>({
      uri: path,
      method,
    })
    await request.fetch()
    return request.data.data
  }

  async findById(id: string): Promise<Project | null> {
    const { method, path } = apiRoutes.projects.byId(id)
    const request = this.apiClient<{ project: Project }>({
      uri: path,
      method,
    })
    await request.fetch()

    if (request.isError()) return null
    return request.data.project
  }

  async create(data: ProjectInput): Promise<Project> {
    const { method, path } = apiRoutes.projects.create
    const request = this.apiClient<{ project: Project }>({
      uri: path,
      method,
      payload: data,
    })
    await request.fetch()
    return request.data.project
  }

  async update(id: string, data: Partial<ProjectInput>): Promise<Project> {
    const { method, path } = apiRoutes.projects.update(id)
    const request = this.apiClient<{ project: Project }>({
      uri: path,
      method,
      payload: data,
    })
    await request.fetch()
    return request.data.project
  }

  async delete(id: string): Promise<void> {
    const { method, path } = apiRoutes.projects.delete(id)
    const request = this.apiClient<void>({
      uri: path,
      method,
    })
    await request.fetch()
  }
}

export function createProjectService(apiClient: FetchDataType) {
  return new ProjectServiceImpl(apiClient)
}

const apiClient = createFetchDataClient(() => null)
export const projectService = createProjectService(apiClient)
