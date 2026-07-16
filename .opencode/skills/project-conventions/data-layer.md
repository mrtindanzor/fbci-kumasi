# Data Layer

> See snippets/service.md for the service layer template and snippets/api-client.md for the API client factory pattern.

## Static Data

Static data is defined in `shared/db/` with co-located types.

### Pattern

```tsx
// <name>.db.types.ts
export type ItemProps = {
  id: string
  name: string
  description: string
}

// <name>.db.ts
import type { ItemProps } from "./<name>.db.types"

export const ITEMS: ItemProps[] = [
  { id: "1", name: "Item 1", description: "..." },
]

export const FEATURED_ITEMS = ITEMS.filter((item) => item.featured)
```

### Rules

- Data arrays use `UPPER_SNAKE_CASE` naming
- Data is frozen with `Object.freeze()` or typed with `as const`
- Types are in a separate `.db.types.ts` file, co-located
- Barrel export in `shared/db/index.ts` re-exports everything
- Filtered subsets are computed from the full array

---

## API Client Layer

### Factory Pattern

The API client uses a curried factory pattern:

```tsx
function createFetchDataClient(accessToken: () => string | null, serverUri: string): FetchDataType

const apiClient = createFetchDataClient(getAccessToken, serverUri)

const client = apiClient({
  uri: "/api/resource",
  method: "post",
  payload: { ... },
})

await client.fetch(optionalValidator)

client.fetchStatus    // { success: true, message } | { success: false, error: true, message }
client.data           // Typed response data
client.isError()      // boolean
client.statusCode     // number | null
```

### GraphQL Client

```tsx
function createFetchQueryClient(accessToken: () => string | null, serverUri: string): FetchQueryType

const client = queryClient({
  query: `query Items($page: Int) { items(page: $page) { data { id name } } }`,
  variables: { page: 1 },
})

await client.fetch()
client.data
```

### Hook Integration

```tsx
function useApiClient() {
  const getAccessToken = useStore((state) => state.getAccessToken)
  const serverUri = config.publicUrls.serverUri

  return useMemo(() => ({
    dataFetch: createFetchDataClient(getAccessToken, serverUri),
    queryFetch: createFetchQueryClient(getAccessToken, serverUri),
  }), [getAccessToken, serverUri])
}
```

---

## Response Types

```tsx
type FetchStatus =
  | { success: true; error: false; message: string }
  | { success: false; error: true; message: string }

type FetchStatusWithData<T> =
  | (FetchSuccessType & { data: T })
  | FetchErrorType
```

---

## Service Layer

### Service Class with Dependency Injection

```tsx
class EntityService implements IEntityService {
  constructor(private apiClient: FetchDataType) {}

  async create(props: DataType): Promise<FetchStatus> {
    const client = this.apiClient({
      uri: apiRoutes.entity.create.path,
      method: apiRoutes.entity.create.method,
      payload: props,
    })
    await client.fetch()
    return client.fetchStatus
  }
}
```

### Factory + Singleton Pattern

```tsx
export function createEntityService(apiClient: FetchDataType) {
  return new EntityService(apiClient)
}

export const entityService = createService(({ apiClient }) =>
  createEntityService(apiClient),
)
```

---

## Validation

### Zod Schemas

All validation uses Zod, defined in feature-specific validator files:

```tsx
export const validator = z.object({
  name: z.string().min(2),
  email: z.string().email(),
}) satisfies z.ZodType<DataType>
```

### Validation Flow

1. Schema is defined in `<name>.validators.ts`
2. Hook calls `validator.parse(payload)` before the API call
3. If validation fails, Zod throws
   - **Frontend hooks:** The form's `handleSubmit` catches the error and surfaces it to form state for field-level display
   - **Backend controllers/resolvers:** Let the error propagate to centralized error handling — do not wrap in `tryCatch` just to rethrow
4. Error messages are extracted using `fe()` utility

---

## Error Handling

### tryCatch Utility

```tsx
import { tryCatch, syncTryCatch } from "@/shared/utils/tryCatch"

const [data, error] = await tryCatch(somePromise)
if (error) return handleError(error)

const [parsed, parseError] = syncTryCatch(() => validator.parse(data))
if (parseError) { /* handle validation error */ }
```

### fe() Error Extraction

```tsx
import { fe } from "@/shared/utils/fe"
const message = fe(someError) // Handles: ZodError, AxiosError, Error, string, unknown
```

---

## Data Flow Summary

```
Static data:   shared/db/<name>.db.ts → Component

API data (REST):   contracts → validators → services (REST client) → axios → API
                   ↓
                   hooks → screens/sections

API data (GraphQL): contracts → validators → services (GraphQL client) → Apollo → API
                    ↓
                    useAppQuery / useAppInfiniteData → hooks → screens/sections
```

### Pagination Data Flow

```
Service returns { nextpage: number | null, data: T[] }
  → useAppInfiniteData flattens pages into single data array
  → Component consumes { data, hasData, hasNoData, isLoading, fetchNextPage }
```
