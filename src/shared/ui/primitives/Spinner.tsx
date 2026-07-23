import type { ComponentProps } from "react"
import { cn } from "@/shared/utils/cn"

export function Spinner({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "h-6 w-6 block animate-spin rounded-full border-2 border-outline-variant border-t-primary",
        className,
      )}
      {...props}
    />
  )
}
