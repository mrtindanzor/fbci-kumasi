# Folder Structure

## Top-Level Layout (Frontend)

```
src/
  assets/           -- SVG icons and static assets as React components
  config/           -- Environment config, app settings
  features/         -- Feature modules (domain logic)
  libs/             -- Third-party library wrappers
  providers/        -- React context providers
  routes/           -- TanStack Router route definitions
  screens/          -- Page components
  shared/           -- Reusable code
  stores/           -- Zustand client-state stores
```

## Config (`src/config/`)

```
config/
  utils/
    getEnv.ts         -- Environment variable reader
  publicUrls.ts       -- App URL, server URI
  socials.ts          -- Social media links from env
```

Rules:
- Config files are the only files that read environment variables
- `getEnv.ts` is the only file that accesses `import.meta.env` or `process.env`

## Stores (`src/stores/`)

```
stores/
  <domain>.store.ts   -- Zustand store
```

Rules:
- One store file per domain concern
- Stores export zustand hooks (e.g., `useSettingsStore`)
- Stores contain client-side state only (not API data)

## Shared (`src/shared/`)

```
shared/
  constants/
    branding.ts          -- Brand name as const
  db/                    -- Static data definitions
    <name>.db.ts
    <name>.db.types.ts
    index.ts
  hooks/                 -- Custom React hooks
    use<Name>.ts
    use<Name>/           -- Complex hooks with multiple files
      use<Name>.ts
      <Name>.types.ts
      index.ts
  layouts/               -- Layout components
    Header.tsx
    Footer.tsx
    Navbar.tsx
    constants.ts
    index.ts
  routes/                -- Route constants
    routes.ts            -- Route paths object + type
    apiRoutes.ts         -- API endpoint constants
    opengraph.ts         -- OpenGraph image path selector
    index.ts
  types/                 -- Shared types
    types.ts
    utils/
      ExtractVariants.ts
      setState.ts
  ui/                    -- UI components
    primitives/          -- Generic, reusable building blocks
      button/
        Button.tsx
        ButtonLink.tsx
        ButtonPO.tsx
        constants.ts
        types.ts
        index.ts
      Input.tsx
      Label.tsx
      Spinner.tsx
      ErrorCard.tsx
      LoadingSwap.tsx
      Visibility.tsx
      Backdrop.tsx
      AccentText.tsx
      MImage.tsx
    Modal/
    Dropdown/
    Carousel/
    Prompt/
    Framer/               -- Animation abstractions
    <domain>/             -- Domain-specific UI
  utils/                  -- Utility functions
    cn.ts
    tryCatch.ts
    fe.ts
    textFormat.ts
    response/
  validators/             -- Shared validation schemas
```

## Features (`src/features/`)

```
features/
  <feature-name>/
    index.ts                        -- Barrel export (public API)
    <feature-name>.contract.types.ts  -- Types + abstract service interface
    <feature-name>.services.ts      -- Service implementation + factory + singleton
    <feature-name>.validators.ts    -- Zod validation schemas
    hooks/                          -- Workflow hooks (one per use case)
      useCreate.ts
      useEdit.ts
      useList.ts
      useDelete.ts
    <feature-name>.cache.ts         -- React Query cache keys (optional)
    <feature-name>.updaters.ts      -- Optimistic update functions (optional)
    <feature-name>.store.ts         -- Zustand feature store (optional)
    components/                     -- Domain-specific UI (optional)
```

When a feature has only one workflow, a single `<feature-name>.use<Name>.ts` file may be used instead of a `hooks/` directory.

## Screens (`src/screens/`)

```
screens/
  <screen-name>/
    index.ts                 -- Barrel export
    <Name>Page.tsx           -- Page component (thin — delegates to hooks)
    sections/                -- Page sections
      <Section>.tsx          -- Named section component
```

## Routes (`src/routes/`)

Routes are organized hierarchically by domain:

```
routes/
  __root.tsx                  -- Root route (html, providers, not-found)
  index.tsx                   -- Home page
  <domain>/                   -- Routes organized by domain
    index.tsx
    create.tsx
    [id]/
      index.tsx               -- Detail view
      edit.tsx
  globals.css                 -- Global stylesheet
```

## Providers (`src/providers/`)

```
providers/
  BaseProvider.tsx             -- Composes all providers
  RoutingProvider.tsx          -- Routing context
  ScrollProvider.tsx           -- Scroll state context
```

## Libraries (`src/libs/`)

```
libs/
  <library-name>/
    index.ts
    <LibraryName>.ts
    types/              -- Complex types (optional)
    utils/              -- Utilities (optional)
```

---

## Top-Level Layout (Backend)

```
src/
  server.ts                -- Entry point
  routes.ts                -- Express router chain

  config/
    env.config.ts
    db.config.ts
    auth.config.ts
    origins.ts

  core/
    errors/
      AppError.ts
      formatAppError.ts
    utils/

  entities/
    <domain>/
      <domain>.types.ts
      <domain>.contract.ts

  features/
    <domain>/
      <domain>.service.ts
      <domain>.repository.ts
      <domain>.validator.ts
      <domain>.model.ts

  transports/
    http/
      index.ts
      middleware/
        errorHandler.ts
        auth.ts
        rateLimit.ts
      <domain>/
        <domain>.routes.ts
        <domain>.controller.ts
    graphql/
      index.ts
      config.ts
      context/
        context.ts
      resolvers/
        <domain>.resolver.ts
      typeDefs/
        <domain>.graphql
    ws/
      wsServer.ts
      connectionHandler.ts
      handlers/
        <domain>.handler.ts

  infra/
    db.ts
    redis.ts
    rate-limit.ts

  publishers/
    appBus.ts

  subscribers/
    appSubscriber.ts

  jobs/
    scheduled.ts
```

---

## Naming Conventions

### Files

| Type | Convention | Examples |
|---|---|---|
| Components | PascalCase | `Button.tsx`, `ListingCard.tsx` |
| Hooks | camelCase with `use` prefix | `useForm.ts`, `useCreate.ts` |
| Utilities | camelCase | `cn.ts`, `tryCatch.ts` |
| Feature files | kebab-case with dots | `listing.contract.types.ts`, `listing.services.ts` |
| Layout utilities | camelCase | `Header.tsx`, `Footer.tsx` |
| Stores | kebab-case | `settings.store.ts` |
| Cache keys | kebab-case | `listing.cache.ts` |
| Barrel | `index.ts` | Always `index.ts` |

### Exports

| Type | Convention |
|---|---|
| Components | PascalCase named export |
| Hooks | camelCase named export |
| Constants | UPPER_SNAKE_CASE |
| Types | PascalCase with `Props`/`Types` suffix |
| Abstract classes | PascalCase with `I` prefix |
| Zod schemas | camelCase |

### Directories

- Feature directories: kebab-case
- Screen directories: kebab-case
- Sections directory: always `sections/`

### Barrel Export Rules

- Every module directory must have an `index.ts` barrel file
- Barrel files re-export only the public API surface
- Never put implementation code in `index.ts`
- Separate value exports from type exports: `export *` vs `export type *`
- Keep barrel files short (under 10 lines)
