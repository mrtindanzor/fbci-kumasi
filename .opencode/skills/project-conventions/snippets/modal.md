# Modal Snippets

## Provider Setup

```tsx
// providers/ModalProvider.tsx
import { createContext, useContext, useRef, useState } from "react"
import type { PropsWithChildren } from "react"

type ModalContextProps = {
  modalRef: React.RefObject<HTMLDivElement | null>
  totalOpenedModals: number
  setTotalOpenedModals: React.Dispatch<React.SetStateAction<number>>
}

const ModalContext = createContext<ModalContextProps | null>(null)

export function ModalProvider({ children }: PropsWithChildren) {
  const modalRef = useRef<HTMLDivElement>(null)
  const [totalOpenedModals, setTotalOpenedModals] = useState(0)

  return (
    <ModalContext value={{ modalRef, totalOpenedModals, setTotalOpenedModals }}>
      {children}
    </ModalContext>
  )
}

export function ModalTarget() {
  const { modalRef } = useModalCtx()
  return <div ref={modalRef} id="modal-target" />
}

export function useModalCtx() {
  const ctx = useContext(ModalContext)
  if (!ctx) throw Error("useModalCtx must be used inside ModalProvider")
  return ctx
}
```

## useModalControls Hook

```tsx
import { useState, useCallback } from "react"

type UseModalControlsProps = {
  defaultOpen?: boolean
  beforeClose?: () => void
}

export function useModalControls({ defaultOpen = false, beforeClose }: UseModalControlsProps = {}) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(async () => {
    await beforeClose?.()
    setIsOpen(false)
  }, [beforeClose])
  const toggle = useCallback(() => setIsOpen((prev) => !prev), [])

  return { isOpen, open, close, toggle }
}
```

## ModalCore Component

```tsx
import { createPortal } from "react-dom"
import { useModalCtx } from "./ModalProvider"
import { FullscreenBackdrop } from "@/shared/ui/primitives/Backdrop"

type ModalCoreProps = {
  children: React.ReactNode
  close: () => void
  id?: string
  backdropClassName?: string
}

export function ModalCore({ children, close, id, backdropClassName }: ModalCoreProps) {
  const { modalRef } = useModalCtx()

  if (!modalRef.current) return null

  return createPortal(
    <FullscreenBackdrop close={close} backdropClassName={backdropClassName}>
      {children}
    </FullscreenBackdrop>,
    modalRef.current,
  )
}
```

## Compound Modal Components

```tsx
import { cva } from "class-variance-authority"
import type { ComponentProps } from "react"
import type { ExtractVariantsTypes } from "@/shared/types/utils/ExtractVariants"
import { cn } from "@/shared/utils/cn"

const rootVariants = cva("relative bg-muted w-full h-full flex flex-col", {
  variants: {
    "layout-mode": {
      auto_1fr_auto: "",
      auto_1fr: "",
      "1fr_auto": "",
    },
    position: {
      top: "justify-start",
      bottom: "justify-end",
      center: "justify-center",
    },
  },
  defaultVariants: { "layout-mode": "auto_1fr_auto", position: "bottom" },
})

type RootVariants = ExtractVariantsTypes<typeof rootVariants>

function Root({ className, "layout-mode": layoutMode, position, ...props }: ComponentProps<"div"> & RootVariants) {
  return <div className={cn(rootVariants({ "layout-mode": layoutMode, position }), className)} {...props} />
}

function Body({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("flex-1 overflow-y-auto px-4", className)} {...props} />
}

function Footer({ className, ...props }: ComponentProps<"footer">) {
  return <footer className={cn("px-4 py-3", className)} {...props} />
}

function Header({ className, ...props }: ComponentProps<"header">) {
  return <header className={cn("px-4 py-3 font-semibold", className)} {...props} />
}

export const Modal = { Root, Body, Footer, Header }
```
