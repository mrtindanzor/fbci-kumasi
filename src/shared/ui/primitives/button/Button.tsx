import type { VariantProps } from "class-variance-authority"
import type { ComponentProps } from "react"
import { cn } from "@/shared/utils/cn"
import { buttonVariants } from "./constants"

type ButtonVariants = VariantProps<typeof buttonVariants>

type ButtonProps = ComponentProps<"button"> & ButtonVariants

export function Button({
  variant,
  size,
  className,
  x,
  y,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, x, y, className }))}
      {...props}
    />
  )
}
