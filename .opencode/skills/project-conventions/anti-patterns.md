# Anti-Patterns

> See best-practices.md for the positive conventions that these anti-patterns violate.

## Architecture Violations

### Importing Across Feature Boundaries

```
// NEVER
import { something } from "@/features/other-feature"

// ALWAYS: extract shared code to shared/
import { something } from "@/shared/utils/something"
```

### Screens Making Direct API Calls

```
// NEVER
export function Page() {
  const [data, setData] = useState()
  useEffect(() => { fetch("/api/data").then(setData) }, [])
}

// ALWAYS: use a feature hook
export function Page() {
  const { data } = useList()
}
```

### Business Logic in Components

```
// NEVER
export function Card({ item }) {
  const discounted = item.price * 0.9
  const formatted = new Intl.NumberFormat().format(discounted)
  return <div>{formatted}</div>
}

// ALWAYS: transform before passing, or use a utility
export function Card({ price }: { price: string }) {
  return <div>{price}</div>
}
```

### Direct Library Usage in Features/Screens

```
// NEVER
import { motion } from "framer-motion"
<motion.div animate={{ x: 100 }} />

// ALWAYS: use the abstraction layer
import { FramerAnimatePosition } from "@/shared/ui/Framer"
```

---

## Giant Conditional Form Components

**The single biggest anti-pattern.** A single component or hook that handles create, edit, and view via `if (mode === "create")` / `if (mode === "edit")` branches.

```
// NEVER
export function EntityForm({ mode, initialData }: { mode: "create" | "edit"; initialData?: Data }) {
  const [isViewing, setIsViewing] = useState(false)

  if (mode === "edit" && isViewing) return <EntityView data={initialData} />
  if (mode === "edit") return <EditForm initialData={initialData} />
  return <CreateForm />
}

// ALWAYS: separate modules per use case
export function CreateEntityPage() { /* only create logic */ }
export function EditEntityPage() { /* only edit logic */ }
export function ViewEntityPage() { /* only view logic */ }
```

**Why:** Each use case has different validation, different state requirements, different success behavior, and different tests. Combining them creates a combinatorial explosion of code paths that are tested together but deployed independently. The structural boilerplate of separate files is a small price for the clarity and maintainability gained.

---

## Deriving Application Types from Validation Schemas

```
// NEVER: schema defines the type
export const validator = z.object({ name: z.string() })
export type DataType = z.infer<typeof validator>

// ALWAYS: contract type defined first, validator satisfies it
export type DataType = { name: string }
export const validator = z.object({ name: z.string() }) satisfies z.ZodType<DataType>
```

**Why:** Deriving types from validation schemas couples your domain to your validation library. It also makes it impossible to have contract types that differ from what a schema can express (branded types, union shapes, etc.). The contract should be stable and framework-independent.

---

## Component Anti-Patterns

### Default Export

```
// NEVER
export default function Button() { }

// ALWAYS: named export
export function Button() { }
```

### Using `React.FC`

```
// NEVER
const Card: React.FC<Props> = ({ prop }) => <div />

// ALWAYS: named function
export function Card({ prop }: Props) { return <div /> }
```

### `interface` for Props

```
// NEVER
interface ButtonProps { label: string }

// ALWAYS: type
type ButtonProps = { label: string }
```

### Props Object Access Pattern

```
// NEVER
export function Card(props: Props) { return <div>{props.title}</div> }

// ALWAYS: destructure
export function Card({ title }: Props) { return <div>{title}</div> }
```

### Not Spreading Props

```
// NEVER
function Input({ className }: ComponentProps<"input">) {
  return <input className={cn("base", className)} />
}

// ALWAYS: spread remaining props
function Input({ className, ...props }: ComponentProps<"input">) {
  return <input className={cn("base", className)} {...props} />
}
```

---

## State Management Anti-Patterns

### Overusing Context

```
// NEVER: creating context for state that could be local or zustand
const LocalStateContext = createContext(null)

// ALWAYS: local state or Zustand for shared client state
```

### Boolean Flag State Instead of Discriminated Unions

```
// NEVER
type LoadingState = { isLoading: boolean; isError: boolean; data?: Data }

// ALWAYS: discriminated union
type LoadingState =
  | { status: "loading" }
  | { status: "success"; data: Data }
  | { status: "error"; message: string }
```

### Mixing Server and Client State

```
// NEVER: storing API data in Zustand
const useDataStore = create(() => ({ resources: [] }))
fetch("/api/resources").then((d) => useDataStore.setState({ resources: d }))

// ALWAYS: use React Query for server state
function useResources() {
  return useQuery({ queryKey: ["resources"], queryFn: () => fetch("/api/resources") })
}
```

### Global State for UI State

Putting form state, modal visibility, or selected item IDs into a global store. These belong in the workflow hook that owns the use case.

---

## Routing Anti-Patterns

### Hardcoded Route Paths

```
// NEVER
<Link to="/about">About</Link>

// ALWAYS: use route constants
<StyledLink href={routes.about}>About</StyledLink>
```

### Flat Route Definitions

All routes in a single file. Instead, organize routes hierarchically by domain.

---

## Data Layer Anti-Patterns

### Bypassing the Service Layer

```
// NEVER: calling axios directly in a hook or component
export function useData() {
  const [data, setData] = useState()
  useEffect(() => { axios.get("/api/data").then(setData) }, [])
}

// ALWAYS: use the service layer
export function useData() {
  return useAppQuery({ cacheKey: ["data"], serviceFn: () => service.list() })
}
```

### Validation in Components

```
// NEVER
function handleSubmit(e) {
  if (name.length < 2) setError("Name too short")
}

// ALWAYS: use Zod schemas in the feature hook
const parsed = validator.parse(payload)
```

### Ignoring Error Handling

```
// NEVER
async function fetchData() {
  const res = await axios.get("/api/data")
  return res.data
}

// ALWAYS
async function fetchData() {
  const [data, error] = await tryCatch(axios.get("/api/data"))
  if (error) return { error: fe(error), success: false as const }
  return { data: data.data, success: true as const }
}
```

### Not Using tryCatch for Async Operations (in service/business logic)

In service and business logic layers where you return discriminated union results, use `tryCatch` to catch and transform errors:

```
// NEVER: unhandled promise rejection
async function save(data): Promise<FetchStatus> {
  const result = await service.create(data)
}

// ALWAYS: wrap in tryCatch to return a typed result
async function save(data): Promise<FetchStatus> {
  const [result, error] = await tryCatch(service.create(data))
  if (error) return handleError(error)
  return result
}
```

**Exception for orchestration layers:** Controllers, route handlers, and GraphQL resolvers should **not** wrap in `tryCatch` just to rethrow. In those layers, let errors propagate to centralized error handling:

```
// DO NOT: catch and rethrow
async function createHandler(req, res) {
  const [result, error] = await tryCatch(service.create(data))
  if (error) throw error
  res.json(result)
}

// DO: let errors propagate naturally
async function createHandler(req, res) {
  const result = await service.create(data)
  res.json(result)
}
```

---

## Naming Anti-Patterns

### Generic Names

```
// NEVER
export function Component() { }
export function useHook() { }

// ALWAYS: descriptive names
export function ListingCard() { }
export function useMediaQuery() { }
```

---

## File Structure Anti-Patterns

### Flat Feature Files

```
// NEVER: all features in a flat list
src/
  ContactForm.tsx
  ContactValidation.ts
  ContactAPI.ts

// ALWAYS: organized by concern type
src/
  features/contact/
  screens/about/
```

### Barrel Files Exporting Everything

Barrel files should only export the public API. Internal implementation details should not be re-exported.

---

## Styling Anti-Patterns

### Inline Styles

```
// NEVER
<div style={{ color: "red", marginTop: "20px" }} />

// ALWAYS: Tailwind classes
<div className="text-red mt-5" />
```

### Not Using cn()

```
// NEVER
<div className={`base ${condition ? "active" : ""} ${className}`} />

// ALWAYS
<div className={cn("base", condition && "active", className)} />
```

---

## Backend Anti-Patterns

### Logic in Controllers

```
// NEVER
app.post("/api/entity", async (req, res) => {
  const result = await db.collection("entities").find({ ... })
})

// ALWAYS: delegate to service, let errors propagate to centralized handler
app.post("/api/entity", async (req, res) => {
  const result = await entityService.create(req.body)
  res.json(result)
})
```

### No Input Validation

```
// NEVER: trusting raw request body
async function create(data) {
  return db.collection("entities").insertOne(data)
}

// ALWAYS: validate with Zod
const parsed = validator.parse(req.body)
const entity = await entityService.create(parsed)
```

### Throwing Non-AppError Errors

```
// NEVER: throwing raw Error or strings
throw new Error("Not found")
throw "Something went wrong"

// ALWAYS: use the error hierarchy
throw new NotFoundError("Entity")
throw new ValidationError("Invalid input")
```

---

## Mixed Conventions

Allowing old architectural patterns to coexist with new ones. If the team adopts vertical slicing, explicit contracts, and separated workflows, all new code must follow these patterns, and touched legacy code must be migrated.

**Why:** Multiple coexisting conventions increase cognitive load, make code reviews inconsistent, and prevent the benefits of the new conventions from being realized.
