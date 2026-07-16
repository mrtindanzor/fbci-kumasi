# Frontend Conventions

> See snippets for corresponding code templates.

## Framework

- React with TypeScript (strict mode enabled)
- TanStack Router for file-based routing
- Vite as the build tool
- Tailwind CSS v4 for styling
- Framer Motion for animations
- TanStack React Query v5 for server state
- Zustand v5 for client state

## Component Patterns

### Component Declaration

Always use named function declarations for components:

```tsx
export function ComponentName({ prop1, prop2 }: ComponentNameProps) {
  return <div>...</div>
}
```

### Props Type Pattern

Use `type` (not `interface`) for props. Combine native element props with custom props using `ComponentProps<T>`:

```tsx
import type { ComponentProps } from "react"

type CustomProps = { title: string }
export type CardProps = ComponentProps<"div"> & CustomProps
```

### Polymorphic Component Pattern

```tsx
type TextProps<T extends React.ElementType> = {
  as?: T
  children: React.ReactNode
} & ComponentProps<T>

export function AccentText<T extends React.ElementType = "i">({
  as: Tag = "i",
  children,
  className,
  ...props
}: TextProps<T>) {
  return <Tag className={cn("text-accent", className)} {...props}>{children}</Tag>
}
```

### Props Spreading

Destructure known props, spread the rest on the native element:

```tsx
export function Input({ className, ...props }: ComponentProps<"input">) {
  return <input className={cn("base-styles", className)} {...props} />
}
```

### Compound Components

Group related components as properties of a parent object:

```tsx
export const Label = { Wrapper, ButtonWrapper, Title }
```

### Conditional Rendering

Use the `<Visibility>` component for conditional rendering:

```tsx
<Visibility show={isVisible}>
  <Content />
</Visibility>
```

For loading state swapping, use `<LoadingSwap>`:

```tsx
<LoadingSwap isLoading={submitting}>
  <SubmitButton />
</LoadingSwap>
```

### Discriminated Union Components

When a component has distinct visual states, use discriminated unions:

```tsx
type CardState =
  | { state: "loading" }
  | { state: "loaded"; data: ResourceData }
  | { state: "error"; message: string }

export function ResourceCard({ cardState }: { cardState: CardState }) {
  switch (cardState.state) {
    case "loading": return <Skeleton />
    case "loaded": return <Content data={cardState.data} />
    case "error": return <ErrorCard error={cardState.message} />
  }
}
```

---

## Custom Hooks

### Hook Naming

Always prefix custom hooks with `use` and use camelCase for file names.

### Hook Composition

Hooks compose other hooks rather than implementing everything inline:

```tsx
export function useForm<T extends Record<string, unknown>>({ data }: useFormProps<T> = {}) {
  const [formdata, { setValue, getValue, reset }] = useSetState(data as T)
  const { setResponse, submitRequest, isLoading, error, success, message } =
    useFetch({ data: formdata })

  const register = useCallback(
    <P extends Path<T>>(path: P) => ({
      value: getPathValueFromData(formdata, path) ?? "",
      onChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setValue(path, e.target.value as PathValue<T, P>)
      },
    }),
    [getPathValueFromData, setValue, formdata],
  )

  return { register, handleSubmit: submitRequest, formState: { error, success, message, submitting: isLoading } }
}
```

### Hook Return Pattern

Return an object (not an array) from hooks with named keys.

### Context Consumer Hook Pattern

Every context provider exports consumer hooks that guard against missing context:

```tsx
export function useAppPathname() {
  const ctx = useContext(RoutingContext)
  if (!ctx) throw Error("useAppPathname must be used inside RoutingProvider")
  return ctx.pathname
}
```

---

## Workflow Hooks Pattern

Feature hooks are separated per use case. Each hook owns its state, validation, and side effects for exactly one workflow.

### Create Flow

```tsx
export function useCreate() {
  const { register, handleSubmit, reset, formState, setResponse } =
    useForm<DataType>({ data: defaultValues })

  const onSubmit = handleSubmit(async function submit(payload) {
    const parsed = validator.parse(payload)
    const res = await service.create(parsed)
    setResponse(res)
    if (res.success) reset()
  })

  return { onSubmit, register, formState, reset }
}
```

### Edit Flow

```tsx
export function useEdit(id: string) {
  const { register, handleSubmit, formState, setResponse } =
    useForm<DataType>({ data: defaultValues })

  const onSubmit = handleSubmit(async function submit(payload) {
    const parsed = validator.parse(payload)
    const res = await service.update(id, parsed)
    setResponse(res)
  })

  return { onSubmit, register, formState }
}
```

### Thin Screen

Screens are thin — they delegate to hooks and reusable components:

```tsx
export function CreatePage() {
  const { onSubmit, register, formState } = useCreate()

  return (
    <main>
      <PageHeader title="Create Entity" />
      <EntityForm onSubmit={onSubmit} register={register} formState={formState} />
    </main>
  )
}
```

---

## State Management

### Three-Layer State Model

```
Layer 1: Server State (TanStack React Query)
  - API data, caching, background refetching, pagination
  - Cache keys are structured tuples: ["domain", "entity", ...identifiers]

Layer 2: Client State (Zustand)
  - Auth tokens, UI preferences, settings, real-time state

Layer 3: Local State (useSetState / useState)
  - Form data, component-specific state
```

### React Query Patterns

```tsx
function useAppQuery<Data>({ cacheKey, serviceFn, ...options }: UseAppQuery<Data>) {
  return useQuery({ ...options, queryKey: cacheKey, queryFn: serviceFn })
}

function useAppInfiniteData<Data>({ cacheKey, serviceFn, ...options }: UseAppInfiniteDataOptions<Data>) {
  const result = useInfiniteQuery({ ...options, queryKey: cacheKey, queryFn: serviceFn })
  const data = useMemo(() => result.data?.pages.flatMap((p) => p.data) ?? [], [result.data])
  const hasData = result.isFetched && (result.hasNextPage || data.length > 0)
  const hasNoData = !result.isLoading && !result.hasNextPage && data.length === 0

  return { ...result, data, hasData, hasNoData }
}
```

### Zustand Store Pattern

```tsx
type SettingsState = {
  region: string | null
  city: string | null
  setRegion: (region: string) => void
  setCity: (city: string) => void
}

export const useSettingsStore = create<SettingsState>()((set) => ({
  region: null,
  city: null,
  setRegion: (region) => set({ region }),
  setCity: (city) => set({ city }),
}))
```

---

## Routing

### Route Definition Pattern

```tsx
import { createFileRoute } from "@tanstack/react-router"
import { generateMetaData } from "@/libs/tanstack"
import { PageComponent } from "@/screens/page"

export const Route = createFileRoute("/path")({
  component: PageComponent,
  head: () => ({
    meta: generateMetaData({
      title: "Page Title",
      description: "Page description",
      path: "path",
      images: opengraphs.select("path"),
    }),
  }),
})
```

### Hierarchical Route Organization

Routes are organized by domain, not flat:

```
routes/__root.tsx
routes/index.tsx
routes/entities/
routes/entities/index.tsx     -- list
routes/entities/create.tsx    -- create
routes/entities/[id]/
routes/entities/[id]/index.tsx -- detail
routes/entities/[id]/edit.tsx  -- edit
```

### Route Constants

```tsx
// shared/routes/routes.ts
export const routes = Object.freeze({
  home: "/",
  entities: {
    list: "/entities",
    create: "/entities/create",
    detail: (id: string) => `/entities/${id}`,
    edit: (id: string) => `/entities/${id}/edit`,
  },
} as const)
```

---

## Modal System

### Architecture

```
ModalProvider (context + portal mount point)
  → ModalTarget (div ref for portal)
  → ModalCore (portal, backdrop, z-index, escape handling)
    → Modal.Root (animated container with layout variants)
      → Modal.Header, Modal.Body, Modal.Footer
```

### Hook-Controlled Pattern

```tsx
function useModalControls(props?: {
  beforeClose?: () => void
  defaultOpen?: boolean
}): { toggle: () => void; close: () => void; open: () => void; isOpen: boolean }
```

---

## Provider Composition

Providers are composed in a tree. `BaseProvider.tsx` composes all global providers.

```tsx
export function DataProviders({ children }) {
  return (
    <AppRoutingProvider>
      <ScrollDirectionProvider>
        {children}
      </ScrollDirectionProvider>
    </AppRoutingProvider>
  )
}
```

---

## Animation

### Framer Motion Abstraction

Never use Framer Motion's `motion.div` directly in screen/feature code. Use the abstraction layer:

```tsx
import { FramerAnimatePosition, motionVariants } from "@/shared/ui/Framer"

const variants = motionVariants({
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
})

<FramerAnimatePosition variants={variants} viewport={{ once: true }}>
  <Content />
</FramerAnimatePosition>
```
