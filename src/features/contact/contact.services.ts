import type { FetchDataType, FetchStatus } from "@/libs/fetchData"
import { apiRoutes } from "@/shared/routes"
import { type ContactType, IContactService } from "./contact.contract.types"

class ContactService extends IContactService {
  constructor(private apiClient: FetchDataType) {
    super()
  }
  async create(props: ContactType): Promise<FetchStatus> {
    const { method, path } = apiRoutes.contact.new
    const client = this.apiClient({
      uri: path,
      method,
      payload: props,
    })
    await client.fetch()

    return client.fetchStatus
  }
}

export function createContactService(apiClient: FetchDataType) {
  return new ContactService(apiClient)
}
