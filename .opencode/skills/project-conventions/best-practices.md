# Best Practices

> See anti-patterns.md for common mistakes that violate these practices.

## TypeScript

### Type Preferences

- Always use `type` over `interface` for type definitions
- Use `import type` for type-only imports
- **No `any` types** — use `unknown` with type guards when the shape is genuinely uncertain. `any` disables the type system and is never acceptable.
- **No type suppressions** — `@ts-ignore` and `@ts-expect-error` mask real issues. If you need one, fix the underlying type mismatch instead.
- Use `as const` for literal types and frozen objects
- Use `ComponentProps<T>` to inherit native HTML props
- Use generics liberally, especially for hooks and utilities
- Prefer discriminated unions over boolean flags for state
- Prefer tuples `[T, E]` for error handling results

### Code Comments

- Do not add comments to explain what code does
- Only add comments when a biome-ignore is genuinely unavoidable

## Import Conventions

### Import Ordering

1. React/hooks
2. Third-party libraries
3. Internal aliased imports (`@/`)
4. Relative imports (`./`)

### Alias

- The `@/` path alias maps to `src/`
- Always use `@/` for imports crossing directory boundaries
- Use relative imports for files in the same directory

### Barrel Exports

Every module directory must have an `index.ts` barrel export that re-exports only the public API:

```tsx
export * from "./file"           -- For values
export type * from "./file"      -- For types (separated)
```

## Naming Conventions

### Files

| Type | Convention | Examples |
|---|---|---|
| Components | PascalCase | `Button.tsx`, `ListingCard.tsx` |
| Hooks | camelCase with `use` prefix | `useForm.ts`, `useCreate.ts` |
| Utilities | camelCase | `cn.ts`, `tryCatch.ts` |
| Feature files | kebab-case with dots | `listing.contract.types.ts` |
| Stores | kebab-case | `settings.store.ts` |
| Barrel | `index.ts` | Always |

### Exports

| Type | Convention |
|---|---|
| Components | PascalCase named export |
| Hooks | camelCase named export |
| Constants | UPPER_SNAKE_CASE |
| Types | PascalCase with suffix |
| Abstract classes | PascalCase with `I` prefix |
| Zod schemas | camelCase |

## Single Responsibility

Each file, module, function, and component has exactly one clear purpose.

- Components render UI; they do not contain business logic
- Hooks contain state and workflow logic; they do not render UI
- Services contain API/business logic; they do not handle state
- Validators contain validation rules; they do not make API calls
- Controllers parse input and format responses; they do not contain business logic

If you need "and" in the description ("this component renders the form AND handles submission"), split it.

## Component Size

- A single component file should rarely exceed 150 lines
- Extract internal sub-components when a file grows beyond 150 lines
- Extract hooks when logic exceeds 30 lines
- Extract types when they exceed 15 lines

## Composition Before Inheritance

Favor composing small, focused units over class hierarchies or large base classes with overrides. Each unit is independently testable and understandable.

## Explicit Over Implicit

Prefer explicit data flow (props in, callbacks out) over context/global state. Use context or dependency injection only for genuinely cross-cutting concerns (auth, theming, localization).

## Defensive Consistency

When introducing a new pattern or convention in a codebase, refactor existing code to match. Do not allow multiple architectural styles to coexist (old and new). If you touch a file to add a feature, leave it cleaner and more consistent than you found it.

## Reusable Abstractions

Extract repeated patterns (pagination, filtering, sorting, CRUD operations) into reusable utilities. But wait for 3+ occurrences before abstracting — avoid premature generalization.

## Discriminated Unions

Always use discriminated unions for component states, API responses, and data states:

```tsx
// GOOD: Explicit states
type UploadState =
  | { state: "idle" }
  | { state: "uploading"; progress: number }
  | { state: "done"; url: string }
  | { state: "error"; reason: string }

// BAD: Boolean flags
type UploadState = {
  isUploading: boolean
  isDone: boolean
  hasError: boolean
}
```

## State Management

- Prefer local state over global state
- Context is for truly global values only (routing, scroll, theme)
- Never store derived state; compute it from source data
- Server state goes in React Query; client state goes in Zustand
- Form state is managed by the feature hook, not the screen

## Service Patterns

- Services are class-based with abstract interfaces
- API client is injected via constructor
- Factory functions create instances: `createXService(apiClient)`
- Singletons are created from factories at module level

## Error Handling

- Use `tryCatch` / `syncTryCatch` in **service and business logic layers** where errors should be caught, transformed, or recovered from
- **Do not** use `tryCatch` / `syncTryCatch` in orchestration layers (controllers, resolvers, route handlers) solely to rethrow or forward the error — let exceptions propagate to centralized error handling
- Synchronous `validator.parse()` throws on invalid input; orchestration code does not wrap it — let it throw
- Async service calls fail with rejected promises; orchestration code does not wrap them in `tryCatch` — let them reject
- Only introduce local error handling in orchestration layers when you need to recover, retry, transform, or enrich an error differently before allowing it to continue
- Normalize errors with `fe()` for user display
- Use discriminated union return types for API results
- Backend error hierarchy: AppError → NotFoundError, ForbiddenError, etc.

## Validation Pattern

- Validation schemas satisfy contract types, not the other way around
- Validators are defined in feature-specific `<name>.validators.ts` files
- Validation happens in the hook/controller, before the service call

## Workflow Hook Pattern

- Separate hooks per use case (create, edit, list, delete)
- Each hook owns its state, validation, and side effects
- Hooks return objects (not arrays) with named keys
- Screens are thin — they call hooks and bind to components

## Backend Patterns

- Controllers are thin: validate input → call service → format response
- Services contain business logic
- Repositories handle data access only
- Errors use the AppError hierarchy
- All input is validated with Zod before reaching the service layer
- Throw typed errors (`NotFoundError`, `ValidationError`), never raw strings

## React Query Patterns

- Always wrap `useQuery` / `useInfiniteQuery` with an app-level wrapper
- Cache keys are structured tuples: `["domain", "entity", ...identifiers]`
- Use hierarchical cache keys: `all → lists → list(filters)`
- Infinite queries flatten pages into a single data array
- Optimistic updates go in dedicated updater files

## Build and Linting

- `tsconfig.json`: `strict: true`, `moduleResolution: "bundler"`, path alias `@/*`
- Linting with Biome
- TypeScript check runs as part of lint: `biome check && tsc --noEmit`
