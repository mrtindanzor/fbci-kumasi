import type { ComponentProps } from "react"
import { cn } from "@/shared/utils/cn"

export function FieldError({
  message,
  className,
  ...props
}: { message?: string } & ComponentProps<"p">) {
  if (!message) return null
  return (
    <p {...props} className={cn("text-error text-sm  px-2 mt-1", className)}>
      {message}
    </p>
  )
}
