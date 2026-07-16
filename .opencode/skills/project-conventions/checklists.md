# Validation Checklists

> After implementing, review anti-patterns.md to catch common violations these checklists may not cover.

## New Feature Checklist

- [ ] Feature directory created under `features/<name>/`
- [ ] `index.ts` barrel export exists
- [ ] `<name>.contract.types.ts` defines data types and abstract service class
- [ ] Contract types are defined first (not derived from validation schemas)
- [ ] `<name>.validators.ts` defines Zod schemas that satisfy the contract types
- [ ] `<name>.services.ts` implements the service with dependency injection
- [ ] Hooks are separated per workflow (`useCreate`, `useEdit`, `useList`) or in a `hooks/` directory
- [ ] Feature does not import from other features
- [ ] All types use `type` not `interface`
- [ ] Service uses factory pattern (create + export singleton)
- [ ] Each hook returns an object (not array)
- [ ] Service layer uses `tryCatch` where recovery or transformation is needed; orchestration code lets errors propagate
- [ ] Cache keys defined if using React Query
- [ ] No `any` or `@ts-ignore`/`@ts-expect-error` in any file

## New Screen Checklist

- [ ] Screen directory created under `screens/<name>/`
- [ ] `index.ts` barrel export exists
- [ ] `<Name>Page.tsx` file exists with named export
- [ ] Sections directory exists (if needed)
- [ ] Sections are imported from `./sections/` (relative)
- [ ] Page composes sections; does not contain business logic
- [ ] Page does not directly import from `libs/`
- [ ] Page does not directly call fetch or axios
- [ ] Page uses `@/` alias for cross-directory imports
- [ ] Business logic is delegated to feature hooks

## New Route Checklist

- [ ] Route file in `routes/<domain>/<name>.tsx`
- [ ] Imports screen page from `@/screens/<name>`
- [ ] Defines `component` property
- [ ] Defines `head()` with `generateMetaData()` for meta tags
- [ ] Route path string exists in `shared/routes/routes.ts`
- [ ] OpenGraph config exists in `shared/routes/opengraph.ts`
- [ ] Route file is minimal (under 25 lines)
- [ ] No business logic in route file

## New Component Checklist

- [ ] Component classification determined before creation (primitive vs domain vs page-specific)
- [ ] Checked for existing primitive that satisfies the requirement first
- [ ] Named function export (not default, not `React.FC`)
- [ ] Props use `type` (not `interface`)
- [ ] Native element props use `ComponentProps<T>`
- [ ] Props are destructured at the function signature
- [ ] Remaining props are spread on the root element
- [ ] `className` is merged with `cn()`
- [ ] File is under 150 lines (or extracted into sub-components)
- [ ] Component is workflow-unaware (receives data/callbacks via props)
- [ ] Barrel export added if component creates a directory

## Data Layer Checklist

- [ ] Static data types are co-located (`.db.types.ts`)
- [ ] Static data arrays use `UPPER_SNAKE_CASE`
- [ ] API routes defined in `shared/routes/apiRoutes.ts`
- [ ] Service receives API client via constructor injection
- [ ] Service factory and singleton exported
- [ ] Validation uses Zod schemas that satisfy contract types
- [ ] Feature hook validates before calling service
- [ ] Service and feature hooks use `tryCatch` + `fe()` where appropriate; orchestration layers let errors propagate
- [ ] `FetchStatus` discriminated union for API results
- [ ] API client uses curried factory pattern

## Context Provider Checklist

- [ ] Context type defined with `type`
- [ ] Context created with `createContext` (initial value `null`)
- [ ] Provider component exported with `<Name>Provider` naming
- [ ] Context value memoized with `useMemo`
- [ ] Consumer hooks exported that guard (throw if null)

## Backend Checklist

- [ ] Controller validates input with Zod before calling service
- [ ] Controller is thin (no business logic)
- [ ] Validator satisfies the contract type
- [ ] Service contains business logic (controller does not)
- [ ] Repository handles data access (service does not)
- [ ] Error handling uses AppError hierarchy
- [ ] Custom errors extend AppError (not Error directly)
- [ ] Routes use auth middleware chain
- [ ] GraphQL resolvers check authentication via context
- [ ] DataLoaders batch database queries per request
- [ ] Graceful shutdown handles DB, Redis, and HTTP server

## Error Handling Checklist

- [ ] Service and business logic layers use `tryCatch` for operations that may need recovery or transformation
- [ ] Orchestration layers (controllers, resolvers, route handlers) let errors propagate — no `tryCatch` just to rethrow
- [ ] All error messages normalized through `fe()`
- [ ] Discriminated union return types for all API calls
- [ ] Backend throws typed AppError (never raw Error or string)
- [ ] Global error handler middleware catches all errors
- [ ] Frontend error states use `ErrorCard` for UI feedback

## Final Review Checklist

- [ ] No feature imports from another feature
- [ ] No `any` types or `@ts-ignore`/`@ts-expect-error` anywhere
- [ ] No conditional flags for workflow modes (create/edit/view) in a single component/hook
- [ ] Contract types are defined first; validators satisfy them (not `z.infer`)
- [ ] All contexts have guards in their consumer hooks
- [ ] Service/business logic uses `tryCatch` where appropriate; orchestration layers let errors propagate
- [ ] All error messages normalized through `fe()`
- [ ] All components are named functions
- [ ] All files under 200 lines (exceptions documented)
- [ ] All directories have barrel exports
- [ ] No `console.log` in production code
- [ ] Linter passes (biome check)
- [ ] TypeScript compiler passes (tsc --noEmit)
- [ ] No framer-motion `motion` in feature/screen code
- [ ] React Query wrappers used instead of raw TanStack hooks
- [ ] Discriminated unions used instead of boolean flags
- [ ] Services use constructor injection for API clients
- [ ] No duplicated primitive components exist
- [ ] All buttons use the shared Button primitive
- [ ] Primitives in `shared/ui/primitives/`, domain components in their feature's `components/`
- [ ] Touched legacy code is refactored to match current conventions
