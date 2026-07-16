# Component Snippets

## Simple Component

```tsx
import type { ComponentProps } from "react"
import { cn } from "@/shared/utils/cn"

type SimpleComponentProps = {
  label: string
} & ComponentProps<"div">

export function SimpleComponent({
  label,
  className,
  children,
  ...props
}: SimpleComponentProps) {
  return (
    <div className={cn("base-styles", className)} {...props}>
      <span>{label}</span>
      {children}
    </div>
  )
}
```

## CVA Component

```tsx
import { cva } from "class-variance-authority"
import type { ComponentProps } from "react"
import type { ExtractVariantsTypes } from "@/shared/types/utils/ExtractVariants"
import { cn } from "@/shared/utils/cn"

const componentVariants = cva("base-styles", {
  variants: {
    variant: {
      primary: "bg-primary text-white",
      secondary: "bg-secondary text-white",
      outline: "bg-transparent border",
    },
    size: {
      sm: "px-2 py-1 text-sm",
      md: "px-4 py-2",
      lg: "px-6 py-3 text-lg",
    },
    radius: {
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      full: "rounded-full",
      none: "rounded-none",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
    radius: "md",
  },
})

type ComponentVariants = ExtractVariantsTypes<typeof componentVariants>

type ComponentProps2 = ComponentVariants & ComponentProps<"button">

export function Component({ variant, size, radius, className, ...props }: ComponentProps2) {
  return (
    <button
      className={cn(
        componentVariants({ variant, size, radius, className }),
      )}
      {...props}
    />
  )
}
```

## Simple Native Input Wrapper

```tsx
import type { ComponentProps } from "react"
import { cn } from "@/shared/utils/cn"

export function TextInput({ className, ...props }: ComponentProps<"input">) {
  return (
    <input
      className={cn("py-2 flex w-full border rounded-md px-4", className)}
      {...props}
    />
  )
}
```

## Compound Component

```tsx
import { cva } from "class-variance-authority"
import type { ComponentProps } from "react"
import type { ExtractVariantsTypes } from "@/shared/types/utils/ExtractVariants"
import { cn } from "@/shared/utils/cn"

const wrapperVariants = cva("base-styles", {
  variants: {
    variant: {
      default: "border",
      none: "",
    },
    pad: {
      sm: "p-2",
      md: "p-4",
      lg: "p-6",
      none: "",
    },
  },
  defaultVariants: { variant: "default", pad: "md" },
})

type WrapperVariants = ExtractVariantsTypes<typeof wrapperVariants>

export const Compound = {
  Wrapper,
  Input,
  Button,
}

function Wrapper({ className, pad, variant, ...props }: ComponentProps<"div"> & WrapperVariants) {
  return (
    <div
      {...props}
      className={cn(wrapperVariants({ variant, pad, className }))}
    />
  )
}

function Input({ className, ...props }: ComponentProps<"input">) {
  return <input className={cn("border rounded", className)} {...props} />
}

function Button({ className, ...props }: ComponentProps<"button">) {
  return <button className={cn("px-4 py-2", className)} {...props} />
}
```

## Polymorphic Component

```tsx
import type { ComponentProps } from "react"
import { cn } from "@/shared/utils/cn"

type PolymorphicProps<T extends React.ElementType> = {
  as?: T
  children: React.ReactNode
} & ComponentProps<T>

export function PolymorphicText<T extends React.ElementType = "span">({
  as: Tag = "span",
  children,
  className,
  ...props
}: PolymorphicProps<T>) {
  return (
    <Tag className={cn("text-accent", className)} {...props}>
      {children}
    </Tag>
  )
}
```
