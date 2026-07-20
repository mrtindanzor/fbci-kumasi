import type { FetchDataType } from "@/libs/fetchData"
import { apiRoutes } from "@/shared/routes/apiRoutes"
import type { IInviteService } from "./invite.contract.types"

export class InviteServiceImpl implements IInviteService {
  constructor(private apiClient: FetchDataType) {}

  async generateLink(originUrl: string): Promise<string> {
    const { method, url } = apiRoutes.auth.registration
    const request = this.apiClient<{ url: string }>({
      uri: url,
      method,
      payload: { url: originUrl },
    })
    await request.fetch()

    if (request.isError()) {
      throw new Error(request.fetchStatus.message)
    }

    return request.data.url
  }
}

export function createInviteService(apiClient: FetchDataType): IInviteService {
  return new InviteServiceImpl(apiClient)
}
