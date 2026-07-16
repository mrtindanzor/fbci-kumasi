# Architecture

## Layered Architecture (Frontend)

The application follows a strict layered architecture with unidirectional dependency flow. Each layer may only depend on layers below it.

### Layer Hierarchy

```
routes/          Layer 5: Route definitions and page metadata
screens/         Layer 4: Page composition (imports from features + shared)
features/        Layer 3: Self-contained domain modules
shared/          Layer 2: Reusable code (UI, hooks, utils, types, constants)
libs/            Layer 2b: Third-party library abstractions
providers/       Layer 2c: React context providers
stores/          Layer 2d: Zustand client-state stores
config/          Layer 1: Environment configuration
```

### Dependency Rules

- **routes/** may import from screens/, shared/, providers/, stores/, libs/, config/, features/
- **screens/** may import from features/, shared/, providers/, stores/, libs/, config/
- **features/** may import from shared/, providers/, stores/, libs/, config/
- **shared/** may import from libs/, config/
- **libs/** may import from shared/utils/ only
- **providers/** may import from shared/, libs/, config/
- **stores/** may import from config/, shared/
- **config/** must have zero application imports

### Bottom Layer: Config (`config/`)

Contains environment variable reading, public URL configuration, and social link constants.

Rules:
- Every environment variable is read through a single `getEnv()` utility
- Static variables use `import.meta.env`, runtime variables use `process.env`
- Environment variables throw at read-time (not runtime) if required and missing
- Config objects are frozen with `Object.freeze()` or `as const`

### Shared Layer (`shared/`)

The shared layer contains everything reused across the application.

Sub-directories:
- `shared/constants/` - App-wide constants (branding, names)
- `shared/db/` - Static data definitions with co-located types
- `shared/hooks/` - Custom React hooks
- `shared/layouts/` - Layout components (header, footer, navigation)
- `shared/routes/` - Route path constants, API route constants, OpenGraph config
- `shared/types/` - Shared TypeScript types and utility types
- `shared/ui/` - UI components (primitive, domain, animation)
- `shared/utils/` - Utility functions
- `shared/validators/` - Shared validation schemas

### Library Layer (`libs/`)

Wraps third-party libraries to reduce coupling and provide type safety.

Rules:
- Each library gets its own sub-directory in `libs/`
- Expose only the functions/types the application needs (not the full library API)
- Third-party types are re-exported through custom types
- Always provide barrel exports (`index.ts`)

### Store Layer (`stores/`)

Zustand stores for client-side state that needs to be shared across the application.

Rules:
- One store file per domain concern
- Stores use Zustand's `create()` with typed state and actions
- Stores are consumed directly in components via hooks
- Complex stores with middleware use `devtools`, `persist` as needed

### Provider Layer (`providers/`)

React context providers used to share global state that cannot use Zustand.

Rules:
- Each provider file exports the context, the provider component, and consumer hooks
- Consumer hooks throw an error if used outside the provider (guard pattern)
- Context values are memoized with `useMemo`
- Providers are composed in a provider tree, not nested in a single file
- `BaseProvider.tsx` composes all global providers

### Feature Layer (`features/`)

Self-contained modules that encapsulate domain logic. See `features.md` for full details.

Rules:
- Each feature is a directory under `features/`
- Features export only a public API surface through `index.ts`
- Internal implementation details stay private
- Features never import from other features
- If two features need shared code, it belongs in `shared/`
- Features own their contracts, services, validators, and hooks

### Screen Layer (`screens/`)

Page components that compose features and shared UI into complete pages.

Rules:
- Each screen corresponds to one route
- Screens compose, not implement
- A screen page imports sections, which import feature hooks
- Screens never contain business logic
- Screens never directly import from `libs/` or make API calls

### Route Layer (`routes/`)

Route definitions that wire screens to URLs.

Rules:
- Each route file is minimal: import a screen, assign it to the route
- Route metadata (head/meta) is defined in the route file
- OpenGraph configuration is centralized in `shared/routes/opengraph.ts`
- Route path strings are centralized in `shared/routes/routes.ts`
- API route paths are centralized in `shared/routes/apiRoutes.ts`

---

## Layered Architecture (Backend)

The backend follows a similar layered architecture with strict dependency direction.

### Layer Hierarchy

```
transports/      Layer 4: HTTP, GraphQL, WebSocket entry points
features/        Layer 3: Business logic (services, repositories, validators)
entities/        Layer 2: Domain entity types and interfaces
core/            Layer 1: Shared errors, base types, utilities
config/          Layer 0: Environment configuration
```

### Dependency Rules

- **transports/** may import from features/, entities/, core/, config/
- **features/** may import from entities/, core/, config/
- **entities/** may import from core/, config/
- **core/** may import from config/ only
- **config/** must have zero application imports

### Transport Layer (`transports/`)

Entry points for external communication.

Sub-layers:
- `transports/http/` - Express REST endpoints with controllers and middleware
- `transports/graphql/` - Apollo GraphQL with resolvers, typeDefs, and context
- `transports/ws/` - Socket.IO WebSocket with connection handlers

Rules:
- Transports parse and validate input, call feature services, format responses
- Controllers never contain business logic
- Each transport is independently testable
- GraphQL context provides auth info, DataLoader instances, and base context

### Entity Layer (`entities/`)

Domain entity types and abstract interfaces for services and repositories.

Rules:
- Each domain has its own entity directory
- Entity types use discriminated unions for state machines
- Abstract interfaces define the contract between layers
- `IService` and `IRepository` interfaces enable DI and testing

### Core Layer (`core/`)

Shared infrastructure code.

Sub-directories:
- `core/errors/` - Custom error hierarchy (AppError, NotFoundError, ForbiddenError, etc.)
- `core/utils/` - Shared utility functions

### Config Layer (`config/`)

Environment variable reading and configuration objects.

Rules:
- Each config concern has its own file
- Config objects are frozen
- Environment variables are read through getEnv()

---

## Explicit Contracts as Source of Truth

Every domain module exposes typed interfaces/contracts that define the shape of its data and operations. These contracts are the single source of truth — consumers depend on them, implementations satisfy them, and validation schemas validate *against* them.

### Contract-First Data Flow

```
Contracts (types/interfaces) — authoritative definitions
    ↓
Validation schemas — satisfy & guard contracts at runtime
    ↓
Services — operate on contract types
    ↓
Hooks/Controllers — orchestrate workflows using contracts
    ↓
Presentation — renders data shaped by contracts
```

### Validation Validates Contracts

Validation schemas satisfy the contract type, not the other way around. The contract is always the authoritative definition.

```tsx
// GOOD: Contract defined first, validator satisfies it
export type DataType = {
  name: string
  description: string | null | undefined
}

import { z } from "zod"
export const validator = z.object({
  name: z.string().min(2),
  description: z.string().nullish(),
}) satisfies z.ZodType<DataType>

// BAD: Deriving types from validation schemas
export const validator = z.object({ name: z.string() })
export type DataType = z.infer<typeof validator>  // Fragile: schema === type
```

**Why:** Contracts are stable, framework-independent definitions. Validation schemas are implementation details that may change (different library, different rules). Deriving application types from schemas couples your domain to your validation library. It also makes it impossible to have contract types that differ from what a schema can express (e.g., branded types, union shapes that validation doesn't directly map to).

---

## Composition Over Configuration

The architecture favors explicit composition over implicit configuration. Pages are composed from sections, which compose features, which compose hooks and services. This makes data flow visible by reading the import graph.

Conditionals in shared components that check "which mode" or "which entity" are a code smell — extract separate use-case-specific modules instead.

### Separated Use Cases

Each user workflow (create, edit, view, list, delete) has its own dedicated hook or controller module. Do not build a single component or hook that handles all modes via conditional logic.

```tsx
// GOOD: Separate hooks per use case
export function useCreateEntity() { /* create state + validation + service call */ }
export function useEditEntity(id: string) { /* load + form state + update call */ }

// BAD: Single hook with mode branching
export function useEntity(mode: "create" | "edit") {
  if (mode === "create") { /* ... */ }
  if (mode === "edit") { /* ... */ }
}
```

**Why:** Conditional branching for workflow modes creates code paths that are tested together but deployed separately, making reasoning about any single use case harder. Separate modules are independently testable, have cleaner interfaces, and are easier to delete or replace when a workflow changes.

---

## Vertical Slicing

A feature/use case is implemented as a vertical slice: contract → service → validation → workflow controller → presentation. Each slice is independently testable and deployable.

Avoid horizontal layers that mix unrelated logic (e.g., one giant "services" folder containing every domain's data access). Instead, each domain owns its complete vertical stack.

---

## Dependency Injection for Infrastructure

Infrastructure concerns (HTTP clients, file storage, email, payment gateways, databases) are abstracted behind interfaces. Domain logic depends on the interface, not the implementation.

**Why:** This enables testing with mocks, swapping implementations without changing domain code, and keeping domain logic pure and portable.

---

## Route Organization

Routes are organized hierarchically by domain/resource, not as flat collections. Each domain owns its sub-tree. Route constants follow the same structure.

**Why:** Hierarchical route structures mirror the domain model, making it easy to find all routes related to a feature. Flat collections require scanning the entire file to find relevant routes.

---

## State Management Architecture

### Three-Layer State Model

```
Server State (React Query)    -- API data, caching, background refetching
Client State (Zustand)        -- Auth tokens, UI state, settings, socket
Local State (useSetState)     -- Form data, component-specific state
```

Rules:
- Server state and client state never mix in the same store
- Local state is preferred; promote to Zustand when 3+ components need it
- Promote to React Query when it represents API-derived data
- Never store derived state; compute it from source data

### Cache Keys

- Cache keys are constants stored alongside feature modules
- Keys are structured as tuples: `["domain", "entity", ...identifiers]`
- Infinite queries use the same key structure as regular queries

---

## Co-location

Files that change together stay together:
- Types stay next to their data files
- Sub-components stay within their parent's directory
- Feature files all live in one directory
- Cache updaters stay with their feature

---

## Component Classification

Before creating any component, determine whether it is:
1. a primitive UI component,
2. a domain (feature) component,
3. or a page-specific component.

This decision is mandatory.

### Primitive Components

Primitive components are generic building blocks. They belong under `src/shared/ui/primitives/`. They must be reusable across the application.

Rules:
- Primitive components are never implemented inside features
- Whenever a primitive UI element is required, first look for an existing implementation before creating a new one
- Creating duplicate primitive components is an architectural violation

### Domain Components

Some components are reusable but belong to a business domain. These are **not** primitive UI. They belong inside their owning feature's `components/` directory.

```
features/
└── listing/
    ├── index.ts
    ├── listing.contract.types.ts
    ├── listing.services.ts
    ├── listing.validators.ts
    └── components/
        ├── ListingCard.tsx
        └── ListingGallery.tsx
```

Rules:
- Domain components live inside their feature's `components/` directory
- Do not move domain components into `shared/ui/primitives/`
- Ownership remains with the feature that defines the business concept
- A component being reused in multiple places does **not** automatically make it a shared primitive; the deciding factor is abstraction level

### Page-Specific Components

Components that are only used by a single screen belong in that screen's `sections/` directory or as internal sub-components in the page file.

---

## Component Creation Workflow

Whenever creating a new component:
1. Determine whether an existing primitive already satisfies the requirement
2. Reuse it whenever possible
3. If not, determine whether the component is a domain abstraction
4. If it belongs to a business feature, create it inside that feature
5. Only create a new primitive if the concept is genuinely generic and reusable across unrelated domains

---

## Reusable Components Are Workflow-Unaware

UI components do not know which workflow they participate in. They receive data and callbacks via props. They do not import services, validators, or workflow hooks.

**Why:** This makes components testable and reusable across different workflows. A button should not care whether it submits a create form or an edit form — it receives `onClick` and renders.

---

## Error Handling Strategy

- Use `tryCatch` / `syncTryCatch` in **service and business logic** to safely execute operations and return `[data, error]` tuples
- **Do not** use `tryCatch` in orchestration layers (controllers, resolvers, route handlers) just to rethrow — let exceptions propagate to centralized error handling
- Synchronous `validator.parse()` throws on invalid input; orchestration code lets it throw
- Use `fe()` to normalize errors from various sources
- Use `ErrorCard` for UI-level error/success display
- Backend uses a custom `AppError` hierarchy with `formatAppError()`

---

## Thin Screens and Controllers

Screens (frontend) and controllers (backend) are thin. They delegate to hooks/services for state and business logic, and to reusable components for rendering.

**Why:** Thin layers are easy to read, test, and replace. Logic accumulates in the wrong places when screens/controllers are given responsibility they should not have.

---

## Reusable Infrastructure

Cross-cutting concerns (uploads, file storage, caching, rate limiting) are designed as extensible abstractions. The domain depends on a generic interface; the concrete implementation is chosen at application startup via dependency injection.

---

## Refactoring Rule

When restructuring existing projects:
1. Identify duplicated primitive components
2. Consolidate them into a single shared primitive
3. Update all usages to consume the shared implementation
4. Preserve functionality while eliminating architectural duplication

Additionally, when introducing a new architectural convention in an existing codebase, refactor touched code to match. Do not allow old and new patterns to coexist indefinitely.
