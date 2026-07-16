# Migration Guide

This guide explains how to convert an arbitrary project into the architecture defined by this skill.

## Phase 1: Classification

Inventory all existing files and classify them:

| Category | Goes To |
|---|---|
| Page-level components | `screens/<name>/` |
| Domain logic (API calls, validation, types) | `features/<name>/` |
| Reusable UI primitives | `shared/ui/primitives/` |
| Domain-specific UI | `features/<name>/components/` |
| Custom hooks | `shared/hooks/` or feature hooks |
| Utility functions | `shared/utils/` |
| Constants and configuration | `shared/constants/`, `config/` |
| Type definitions | `shared/types/` or co-located |
| Third-party wrappers | `libs/<name>/` |
| Context providers | `providers/` |
| Route definitions | `routes/` |
| Client state (non-API) | `stores/` |
| API route strings | `shared/routes/apiRoutes.ts` |

### Backend Classification

| Category | Goes To |
|---|---|
| Route handlers | `transports/http/<domain>/` |
| Controllers | `transports/http/<domain>/<domain>.controller.ts` |
| Business logic | `features/<domain>/<domain>.service.ts` |
| Data access | `features/<domain>/<domain>.repository.ts` |
| Domain types | `entities/<domain>/<domain>.types.ts` |
| Abstract interfaces | `entities/<domain>/<domain>.contract.ts` |
| Validation | `features/<domain>/<domain>.validator.ts` |
| Mongoose schemas | `features/<domain>/<domain>.model.ts` |
| Middleware | `transports/http/middleware/` |
| Error types | `core/errors/` |

## Phase 2: Bottom-Up Migration

Migrate layers from bottom to top (dependencies first).

### Config Layer

1. Create `config/utils/getEnv.ts` for reading environment variables
2. Create `config/publicUrls.ts` for app URLs and server URIs
3. Freeze all config objects with `Object.freeze()` or `as const`

### Shared Layer

1. Create `shared/utils/cn.ts` (clsx + tailwind-merge)
2. Create `shared/utils/tryCatch.ts`
3. Create `shared/utils/fe.ts`
4. Move shared types to `shared/types/`
5. Classify and move UI components: primitives → `shared/ui/primitives/`, domain → feature `components/`
6. Move existing custom hooks to `shared/hooks/`

### Features

For each domain:
1. Create `features/<name>/` directory with `index.ts` barrel
2. Define contract types in `<name>.contract.types.ts` (source of truth)
3. Define validators in `<name>.validators.ts` that satisfy the contract types
4. Implement service in `<name>.services.ts` (class + factory + singleton)
5. Create workflow hooks in `hooks/useCreate.ts`, `hooks/useEdit.ts`, etc.
6. Optionally add `<name>.cache.ts`, `<name>.updaters.ts`, `<name>.store.ts`
7. Ensure the feature does not import from other features

### Screens

For each page:
1. Create `screens/<name>/` with thin `<Name>Page.tsx`
2. Extract sections into `sections/`
3. Sections consume feature hooks and render UI
4. Ensure the page contains no business logic

### Routes

1. Create route files organized hierarchically by domain
2. Each route imports a screen and assigns it
3. Centralize route paths in `shared/routes/routes.ts`
4. Centralize API paths in `shared/routes/apiRoutes.ts`

## Common Migration Tasks

### Splitting Conditional Form Components

When a single component handles create, edit, and view via mode flags:
1. Identify each distinct workflow
2. Create a separate hook per workflow (`useCreate`, `useEdit`, `useView`)
3. Extract shared validation and services into base feature files
4. Create separate screen components per workflow

### Converting to Contract-First Validation

1. Write the contract type explicitly (what shape does this data have?)
2. Update the Zod schema to satisfy the contract type (`satisfies z.ZodType<DataType>`)
3. Remove any `z.infer<typeof schema>` usage — replace with the explicit type

### Removing `any` and Type Suppressions

1. Replace `any` with `unknown` where the shape is genuinely uncertain
2. Add type guards or proper type definitions
3. Replace `@ts-ignore`/`@ts-expect-error` with correct type definitions

### Adding Dependency Injection

1. Create an abstract interface for the infrastructure dependency
2. Inject the dependency through the constructor
3. Wire the concrete implementation at the composition root

## Decision Tree

```
Is this code shared across multiple features/screens?
  YES → shared/
  NO  → Does it contain domain/business logic?
    YES → features/<name>/
    NO  → Is it a page?
      YES → screens/<name>/
      NO  → Is it a route config?
        YES → routes/
        NO  → Is it a context provider?
          YES → providers/
          NO  → Is it a third-party wrapper?
            YES → libs/
            NO  → Is it configuration?
              YES → config/
              NO  → Is it client-side state?
                YES → stores/
                NO  → Determine its actual purpose
```
