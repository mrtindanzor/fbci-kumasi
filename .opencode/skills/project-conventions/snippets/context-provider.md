# Context Provider Snippet

## Provider Module

```tsx
import {
  createContext,
  type PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react"

// 1. Define the context type
type ContextType = {
  value1: string
  value2: number
  setValue1: (val: string) => void
  increment: () => void
}

// 2. Create context with null initial value
const Context = createContext<ContextType | null>(null)

// 3. Create the provider component
export function Provider({ children }: PropsWithChildren) {
  const [value1, setValue1] = useState("")
  const [value2, setValue2] = useState(0)

  const increment = useMemo(
    () => () => setValue2((prev) => prev + 1),
    [],
  )

  const value = useMemo(
    () => ({ value1, value2, setValue1, increment }),
    [value1, value2, increment],
  )

  return <Context value={value}>{children}</Context>
}

// 4. Create consumer hooks with guards
export function useConsumerValue1() {
  const ctx = useContext(Context)
  if (!ctx) throw Error("useConsumerValue1 must be used inside Provider")
  return ctx.value1
}

export function useConsumerValue2() {
  const ctx = useContext(Context)
  if (!ctx) throw Error("useConsumerValue2 must be used inside Provider")
  return { value: ctx.value2, increment: ctx.increment }
}
```

## Provider Composition (BaseProvider)

```tsx
// Top-level composition of all providers
import { Provider as Provider1 } from "./Provider1"
import { Provider as Provider2 } from "./Provider2"

// Pure providers (no UI)
export function DataProviders({ children }: { children: React.ReactNode }) {
  return (
    <Provider1>
      <Provider2>{children}</Provider2>
    </Provider1>
  )
}

// Providers with UI wrappers
export function ProvidersWithExtraUI({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <LayoutHeader />
      {children}
      <LayoutFooter />
    </div>
  )
}
```
