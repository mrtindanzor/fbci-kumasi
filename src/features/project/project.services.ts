import type { FetchDataType } from "@/libs/fetchData"
import { createFetchDataClient } from "@/libs/fetchData"
import type {
	IProjectService,
	Project,
	ProjectFilters,
} from "./project.contract.types"
import { PROJECTS_MOCK_DATA } from "./project.mock-data"

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

		let results = [...PROJECTS_MOCK_DATA]

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

		return PROJECTS_MOCK_DATA.find((p) => p.id === id) ?? null
	}
}

export function createProjectService(apiClient: FetchDataType) {
	return new ProjectServiceImpl(apiClient)
}

const apiClient = createFetchDataClient(() => null)
export const projectService = createProjectService(apiClient)
