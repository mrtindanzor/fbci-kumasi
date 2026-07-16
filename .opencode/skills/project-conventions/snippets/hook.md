# Hook Snippets

## Simple Hook

```tsx
import { useCallback, useEffect, useRef, useState } from "react"

type UseMediaQueryProps = {
  size?: "sm" | "md" | "lg"
  comparison?: "<" | ">"
  customSize?: number
}

const breakpoints = { sm: 640, md: 768, lg: 1024 }

export function useMediaQuery({
  size = "sm",
  comparison = "<",
  customSize,
}: UseMediaQueryProps = {}) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const query =
      comparison === "<"
        ? `(max-width: ${customSize || breakpoints[size]}px)`
        : `(min-width: ${customSize || breakpoints[size]}px)`

    const media = window.matchMedia(query)
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches)

    setMatches(media.matches)
    media.addEventListener("change", handler)
    return () => media.removeEventListener("change", handler)
  }, [size, comparison, customSize])

  return matches
}
```

## Hook with Overloads

```tsx
import { useLayoutEffect, useRef, useState } from "react"

type UseAnimationProps = {
  duration?: number
  enabled?: boolean
  whileInView?: boolean
}

export function useAnimation(props: { enabled: true; duration?: number }): string
export function useAnimation(props: {
  whileInView: true
  duration?: number
}): { value: string; ref: <T>(el: T | null) => void }

export function useAnimation({
  duration = 300,
  enabled: defaultEnabled,
  whileInView,
}: UseAnimationProps) {
  const [value, setValue] = useState("")
  const ref = useRef<HTMLElement>(null)

  // Implementation...

  if (defaultEnabled) return value
  return { value, ref: (el) => { ref.current = el as HTMLElement } }
}
```

## Context Consumer Hook

```tsx
import { createContext, useContext } from "react"

type ContextType = {
  value: string
  update: (val: string) => void
}

export const ContextName = createContext<ContextType | null>(null)

export function useConsumer() {
  const ctx = useContext(ContextName)
  if (!ctx) throw Error("useConsumer must be used inside ProviderName")
  return ctx
}
```

## Composed Hook (Feature Pattern — Separated Workflows)

Each workflow (create, edit, list) gets its own hook. Never combine them into a single hook with a mode flag.

```tsx
// hooks/useCreate.ts — create workflow only
import { useForm } from "@/shared/hooks/useForm"
import type { DataType } from "../feature.contract.types"
import { service } from "../feature.services"
import { validator } from "../feature.validators"

export function useCreate() {
  const { register, handleSubmit, reset, formState, setResponse } =
    useForm<DataType>({ data: { field1: "", field2: "" } })

  const onSubmit = handleSubmit(async (payload) => {
    const parsed = validator.parse(payload)
    const res = await service.create(parsed)
    setResponse(res)
    if (res.success) reset()
  })

  return { onSubmit, register, formState, reset }
}
```

```tsx
// hooks/useEdit.ts — edit workflow only (loads existing data, calls update)
import { useForm } from "@/shared/hooks/useForm"
import type { DataType } from "../feature.contract.types"
import { service } from "../feature.services"
import { validator } from "../feature.validators"

export function useEdit(id: string) {
  const { register, handleSubmit, formState, setResponse } =
    useForm<DataType>({ data: { field1: "", field2: "" } })

  const onSubmit = handleSubmit(async (payload) => {
    const parsed = validator.parse(payload)
    const res = await service.update(id, parsed)
    setResponse(res)
  })

  return { onSubmit, register, formState }
}
```
