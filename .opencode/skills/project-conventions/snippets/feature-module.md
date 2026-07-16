# Feature Module Snippet

## Directory Structure

```
features/<name>/
  index.ts
  <name>.contract.types.ts
  <name>.services.ts
  <name>.validators.ts
  hooks/
    useCreate.ts
    useEdit.ts
    useList.ts
```

When the feature has only one workflow, a single `<name>.use<Name>.ts` file may be used instead.

## Files

### `index.ts`

```tsx
export * from "./<name>.contract.types"
export * from "./<name>.services"
export * from "./<name>.validators"
export { useCreate } from "./hooks/useCreate"
export { useEdit } from "./hooks/useEdit"
export { useList } from "./hooks/useList"
```

### `<name>.contract.types.ts`

Contract types are the source of truth — defined first, not derived from validation schemas.

```tsx
import type { FetchStatus } from "@/shared/utils/response"

export type DataType = {
  field1: string
  field2: string
  field3?: string | null
}

export abstract class IService {
  abstract create(props: DataType): Promise<FetchStatus>
  abstract update(id: string, props: Partial<DataType>): Promise<FetchStatus>
  abstract delete(id: string): Promise<FetchStatus>
}
```

### `<name>.validators.ts`

Validation schemas satisfy the contract type — they do not define it.

```tsx
import { z } from "zod"
import type { DataType } from "./<name>.contract.types"

export const validator = z.object({
  field1: z.string().min(2, "Field1 must be at least 2 characters"),
  field2: z.string().min(2, "Field2 must be at least 2 characters"),
  field3: z.string().nullish(),
}) satisfies z.ZodType<DataType>
```

### `<name>.services.ts`

```tsx
import { createService, type FetchDataType } from "@/libs/fetchData"
import { apiRoutes } from "@/shared/routes/apiRoutes"
import type { FetchStatus } from "@/shared/utils/response"
import { type DataType, IService } from "./<name>.contract.types"

class Service extends IService {
  constructor(private apiClient: FetchDataType) {
    super()
  }

  async create(props: DataType): Promise<FetchStatus> {
    const client = this.apiClient({
      uri: apiRoutes.resource.action.path,
      method: apiRoutes.resource.action.method,
      payload: props,
    })
    await client.fetch()
    return client.fetchStatus
  }

  async update(id: string, props: Partial<DataType>): Promise<FetchStatus> {
    const client = this.apiClient({
      uri: `${apiRoutes.resource.action.path}/${id}`,
      method: "put",
      payload: props,
    })
    await client.fetch()
    return client.fetchStatus
  }

  async delete(id: string): Promise<FetchStatus> {
    const client = this.apiClient({
      uri: `${apiRoutes.resource.action.path}/${id}`,
      method: "delete",
    })
    await client.fetch()
    return client.fetchStatus
  }
}

export function createFeatureService(apiClient: FetchDataType) {
  return new Service(apiClient)
}

export const featureService = createService(({ apiClient }) =>
  createFeatureService(apiClient),
)
```

### `hooks/useCreate.ts`

Separate create hook — owns its state, validation, and side effects for the create workflow only.

```tsx
import { useForm } from "@/shared/hooks/useForm"
import type { DataType } from "../<name>.contract.types"
import { featureService } from "../<name>.services"
import { validator } from "../<name>.validators"

export function useCreate() {
  const { register, handleSubmit, reset, formState, setResponse } =
    useForm<DataType>({
      data: { field1: "", field2: "" },
    })

  const onSubmit = handleSubmit(async function submit(payload) {
    const parsed = validator.parse(payload)
    const res = await featureService.create(parsed)
    setResponse(res)
    if (res.success) reset({ field1: "", field2: "" })
  })

  return { onSubmit, register, formState, reset }
}
```

### `hooks/useEdit.ts`

Separate edit hook — loads existing data, validates on submit, calls update service.

```tsx
import { useForm } from "@/shared/hooks/useForm"
import type { DataType } from "../<name>.contract.types"
import { featureService } from "../<name>.services"
import { validator } from "../<name>.validators"

export function useEdit(id: string) {
  const { register, handleSubmit, formState, setResponse } =
    useForm<DataType>({
      data: { field1: "", field2: "" },
    })

  const onSubmit = handleSubmit(async function submit(payload) {
    const parsed = validator.parse(payload)
    const res = await featureService.update(id, parsed)
    setResponse(res)
  })

  return { onSubmit, register, formState }
}
```
