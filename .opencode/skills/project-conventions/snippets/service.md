# Service Layer Snippet

## Complete Service Module

```tsx
// types.ts
import type { FetchStatus } from "@/shared/utils/response"

export type DataPayload = {
  field1: string
  field2: number
  field3?: boolean
}

export abstract class IDataService {
  abstract create(props: DataPayload): Promise<FetchStatus>
  abstract list(): Promise<FetchStatusWithData<DataPayload[]>>
  abstract get(id: string): Promise<FetchStatusWithData<DataPayload>>
  abstract update(id: string, props: Partial<DataPayload>): Promise<FetchStatus>
  abstract delete(id: string): Promise<FetchStatus>
}

// services.ts
import { createService, type FetchDataType } from "@/libs/fetchData"
import { apiRoutes } from "@/shared/routes/apiRoutes"
import type {
  FetchStatus,
  FetchStatusWithData,
} from "@/shared/utils/response"
import { type DataPayload, IDataService } from "./types"

class DataService extends IDataService {
  constructor(private api: FetchDataType) {
    super()
  }

  async create(props: DataPayload): Promise<FetchStatus> {
    const client = this.api({
      uri: apiRoutes.resource.list.path,
      method: apiRoutes.resource.list.method,
      payload: props,
    })
    await client.fetch()
    return client.fetchStatus
  }

  async list(): Promise<FetchStatusWithData<DataPayload[]>> {
    const client = this.api({
      uri: apiRoutes.resource.list.path,
      method: "get",
    })
    await client.fetch()
    return client.dataWithStatus as FetchStatusWithData<DataPayload[]>
  }

  async get(id: string): Promise<FetchStatusWithData<DataPayload>> {
    const client = this.api({
      uri: `${apiRoutes.resource.list.path}/${id}`,
      method: "get",
    })
    await client.fetch()
    return client.dataWithStatus as FetchStatusWithData<DataPayload>
  }

  async update(id: string, props: Partial<DataPayload>): Promise<FetchStatus> {
    const client = this.api({
      uri: `${apiRoutes.resource.list.path}/${id}`,
      method: "put",
      payload: props,
    })
    await client.fetch()
    return client.fetchStatus
  }

  async delete(id: string): Promise<FetchStatus> {
    const client = this.api({
      uri: `${apiRoutes.resource.list.path}/${id}`,
      method: "delete",
    })
    await client.fetch()
    return client.fetchStatus
  }
}

// Factory
export function createDataService(api: FetchDataType) {
  return new DataService(api)
}

// Singleton
export const dataService = createService(({ apiClient }) =>
  createDataService(apiClient),
)
```
