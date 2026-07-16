# Feature Modules

> See snippets/feature-module.md for a complete feature module template.

## What Is a Feature Module

A feature module encapsulates all domain logic for a single bounded context. It is self-contained and knows nothing about screens or other features.

## Structure

Every feature module uses this structure:

```
features/<name>/
  index.ts                          -- Barrel export (public API)
  <name>.contract.types.ts          -- Types + abstract service interface
  <name>.services.ts                -- Service implementation + factory + singleton
  <name>.validators.ts              -- Zod validation schemas
  <name>.use<Name>.ts               -- Feature hook (or hooks/ directory for multiple workflows)
  <name>.store.ts                   -- Zustand store (optional, for client state)
  <name>.cache.ts                   -- React Query cache keys (optional)
  <name>.updaters.ts                -- Optimistic update functions (optional)
  components/                       -- Domain-specific UI components (optional)
```

When a feature has multiple distinct workflows (create, edit, list), use a `hooks/` sub-directory with separate files instead of a single hook file:

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

## File Naming Convention

Files follow a strict `<feature-name>.<concern>.ts` pattern:

| File Pattern | Purpose |
|---|---|
| `<name>.contract.types.ts` | Data types and abstract service contract |
| `<name>.services.ts` | Service class, factory function, singleton |
| `<name>.validators.ts` | Zod schemas for validation |
| `<name>.use<Name>.ts` | Custom hook (single workflow) |
| `<name>.store.ts` | Zustand store for client-side feature state |
| `<name>.cache.ts` | React Query cache key tuples |
| `<name>.updaters.ts` | Optimistic cache update functions |

## Contract-First Design

The contract type is defined first. The validator schema satisfies the contract type — it does not define it.

```tsx
// <name>.contract.types.ts
export type DataType = {
  field1: string
  field2: string
  field3?: string | null
}

export abstract class IService {
  abstract create(props: DataType): Promise<FetchStatus>
  abstract update(id: string, props: Partial<DataType>): Promise<FetchStatus>
}

// <name>.validators.ts
import { z } from "zod"

export const validator = z.object({
  field1: z.string().min(2),
  field2: z.string().min(2),
  field3: z.string().nullish(),
}) satisfies z.ZodType<DataType>
```

## Dependency Injection Pattern

Services use constructor injection for their API client:

```tsx
// <name>.services.ts
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
}

export function createFeatureService(apiClient: FetchDataType) {
  return new Service(apiClient)
}

export const featureService = createService(({ apiClient }) =>
  createFeatureService(apiClient),
)
```

## Hook Pattern — Separated Use Cases

Instead of a single hook handling multiple modes, create separate hooks per workflow:

```tsx
// hooks/useCreate.ts
export function useCreate() {
  const { register, handleSubmit, reset, formState, setResponse } =
    useForm<DataType>({ data: { field1: "", field2: "" } })

  const onSubmit = handleSubmit(async function submit(payload) {
    const parsed = validator.parse(payload)
    const res = await featureService.create(parsed)
    setResponse(res)
    if (res.success) reset({ field1: "", field2: "" })
  })

  return { onSubmit, register, formState, reset }
}

// hooks/useEdit.ts
export function useEdit(id: string) {
  const { register, handleSubmit, formState, setResponse } =
    useForm<DataType>({ data: { field1: "", field2: "" } })

  const onSubmit = handleSubmit(async function submit(payload) {
    const parsed = validator.parse(payload)
    const res = await featureService.update(id, parsed)
    setResponse(res)
  })

  return { onSubmit, register, formState }
}
```

**Why separate hooks?** Each workflow has different state requirements, different validation rules, and different post-submit behavior. Combining them with mode flags creates conditional branches that are tested together but deployed separately. Separate hooks are independently testable, have cleaner interfaces, and can be deleted independently when workflows change.

## Cache Key Pattern

```tsx
// <name>.cache.ts
export const featureKeys = {
  all: ["feature"] as const,
  lists: () => [...featureKeys.all, "list"] as const,
  list: (filters: Record<string, unknown>) => [...featureKeys.lists(), filters] as const,
  details: () => [...featureKeys.all, "detail"] as const,
  detail: (id: string) => [...featureKeys.details(), id] as const,
}
```

## Data Flow Through a Feature

```
Contracts (types + abstract interfaces)
    ↓
Validators (Zod schemas that satisfy contracts)
    ↓
Services (API calls via injected client)
    ↓
Hooks (compose services + form state + React Query, one per workflow)
    ↓
Screens/Sections (consume hooks, render UI)
```

## Domain Components

Components that are reusable but belong to a business domain belong inside their owning feature's `components/` directory.

```
features/
└── listing/
    ├── index.ts
    ├── listing.contract.types.ts
    ├── listing.services.ts
    ├── listing.validators.ts
    ├── hooks/
    │   ├── useCreate.ts
    │   ├── useEdit.ts
    │   └── useList.ts
    └── components/
        ├── ListingCard.tsx
        └── ListingGallery.tsx
```

Rules:
- Domain components live inside their feature's `components/` directory
- Do not move domain components into `shared/ui`
- Ownership remains with the feature that defines the business concept
- Other features may import them if appropriate, but ownership does not change

## Barrel Export

The feature's `index.ts` re-exports everything that is part of the public API:

```tsx
export * from "./<name>.contract.types"
export * from "./<name>.services"
export * from "./<name>.validators"
export { useCreate } from "./hooks/useCreate"
export { useEdit } from "./hooks/useEdit"
```

## Rules

- Features never import from other features
- If two features need the same code, extract it to `shared/`
- A feature's internal implementation is not exported from `index.ts`
- Hooks are the primary consumer-facing exports
- The abstract class in `contract.types.ts` serves as the service contract
- The service singleton is created once via the factory
- Validation happens in the hook, before the service call
- Form state management is handled by the feature hook, not the screen
- Contracts are the source of truth; validators satisfy them
- Each workflow (create, edit, list) gets its own hook
