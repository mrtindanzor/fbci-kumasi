import { createFetchDataClient, type FetchDataType } from "@/libs/fetchData"
import { apiRoutes } from "@/shared/routes/apiRoutes"
import type {
  Conference,
  ConferenceInput,
  IConferenceService,
} from "./conference.contract.types"

export class ConferenceServiceImpl implements IConferenceService {
  constructor(private apiClient: FetchDataType) {}

  async findActive(): Promise<Conference | null> {
    const { method, path } = apiRoutes.conferences.active
    const request = this.apiClient<{ conference: Conference | null }>({
      uri: path,
      method,
    })
    await request.fetch()

    if (request.isError()) return null
    return request.data.conference
  }

  async findById(id: string): Promise<Conference | null> {
    const { method, path } = apiRoutes.conferences.byId(id)
    const request = this.apiClient<{ conference: Conference }>({
      uri: path,
      method,
    })
    await request.fetch()

    if (request.isError()) return null
    return request.data.conference
  }

  async create(data: ConferenceInput): Promise<Conference> {
    const { method, path } = apiRoutes.conferences.create
    const request = this.apiClient<{ conference: Conference }>({
      uri: path,
      method,
      payload: data,
    })
    await request.fetch()
    return request.data.conference
  }

  async update(
    id: string,
    data: Partial<ConferenceInput>,
  ): Promise<Conference> {
    const { method, path } = apiRoutes.conferences.update(id)
    const request = this.apiClient<{ conference: Conference }>({
      uri: path,
      method,
      payload: data,
    })
    await request.fetch()
    return request.data.conference
  }

  async delete(id: string): Promise<void> {
    const { method, path } = apiRoutes.conferences.delete(id)
    const request = this.apiClient<void>({
      uri: path,
      method,
    })
    await request.fetch()
  }
}

export function createConferenceService(apiClient: FetchDataType) {
  return new ConferenceServiceImpl(apiClient)
}

const apiClient = createFetchDataClient(() => null)
export const conferenceService = createConferenceService(apiClient)
