# Barrel Export Snippet

## Standard Barrel Pattern

Every module directory must have an `index.ts` that serves as the public API.

### Simple Barrel

```tsx
export * from "./module"
```

### Named Export Barrel

```tsx
export { ComponentName } from "./ComponentName"
export { useHook } from "./useHook"
```

### Barrel with Types Separated

```tsx
export * from "./implementation"
export type * from "./types"
```

### Feature Module Barrel

```tsx
export * from "./feature.contract.types"
export * from "./feature.services"
export * from "./feature.validators"
export * from "./feature.useFeature"
```

### Data Layer Barrel

```tsx
export * from "./items.db"
export type * from "./items.db.types"
export * from "./users.db"
export type * from "./users.db.types"
```

### Library Barrel

```tsx
export * from "./client"
export * from "./utils"
export type * from "./types"
```

### Rules

- Always use `index.ts` as the barrel file name
- Never put implementation code in `index.ts`
- Separate value exports from type exports: `export *` vs `export type *`
- Do not re-export internal/private implementation details
- Keep barrel files short (under 10 lines)
