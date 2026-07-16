# Dropdown Snippet

## Compound Dropdown Component

```tsx
import { createContext, useContext, useState, useCallback } from "react"
import type { ComponentProps, PropsWithChildren } from "react"
import { cn } from "@/shared/utils/cn"
import { FramerAnimatePosition } from "@/shared/ui/Framer"
import { useAutoHide } from "@/shared/hooks/useAutoHide"

type DropdownContextType = {
  isOpen: boolean
  setIsOpen: (val: boolean) => void
  toggle: () => void
  captureRef: (index?: number) => (ref: HTMLElement | null) => void
}

const DropdownContext = createContext<DropdownContextType | null>(null)

function Wrapper({ children, className, ...props }: ComponentProps<"div">) {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = useCallback(() => setIsOpen((prev) => !prev), [])
  const { captureRef } = useAutoHide({ isOpen, setIsOpen: () => setIsOpen(false) })

  return (
    <DropdownContext value={{ isOpen, setIsOpen, toggle, captureRef }}>
      <div className={cn("relative", className)} {...props}>
        {children}
      </div>
    </DropdownContext>
  )
}

function WrapperButton({ className, ...props }: ComponentProps<"button">) {
  const ctx = useDropdown()
  return (
    <button
      ref={ctx.captureRef()}
      onClick={ctx.toggle}
      className={cn("cursor-pointer", className)}
      {...props}
    />
  )
}

function ListWrapper({ className, children, ...props }: ComponentProps<"div">) {
  const ctx = useDropdown()

  if (!ctx.isOpen) return null

  return (
    <FramerAnimatePosition
      variants={{
        hidden: { opacity: 0, y: -8 },
        show: { opacity: 1, y: 0 },
      }}
    >
      <div
        ref={ctx.captureRef(1)}
        className={cn("absolute right-0 z-50 mt-1 min-w-40 rounded-lg border bg-white shadow-lg", className)}
        {...props}
      >
        {children}
      </div>
    </FramerAnimatePosition>
  )
}

function DropdownButton({ className, onClick, ...props }: ComponentProps<"button">) {
  const ctx = useDropdown()

  return (
    <li>
      <button
        className={cn("w-full px-4 py-2 text-left hover:bg-muted", className)}
        onClick={(e) => { ctx.setIsOpen(false); onClick?.(e) }}
        {...props}
      />
    </li>
  )
}

function DropdownButtonLink({ href, className, children, ...props }: ComponentProps<"a"> & { href: string }) {
  const ctx = useDropdown()

  return (
    <li>
      <a
        href={href}
        className={cn("block w-full px-4 py-2 hover:bg-muted", className)}
        onClick={() => ctx.setIsOpen(false)}
        {...props}
      >
        {children}
      </a>
    </li>
  )
}

export function useDropdown() {
  const ctx = useContext(DropdownContext)
  if (!ctx) throw Error("useDropdown must be used inside Dropdown.Wrapper")
  return ctx
}

export const Dropdown = { Wrapper, WrapperButton, ListWrapper, DropdownButton, DropdownButtonLink }
```
