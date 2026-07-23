import type { ComponentProps } from "react"
import { cn } from "@/shared/utils/cn"

export function FieldSuccess({
  className,
  message,
  ...props
}: ComponentProps<"p"> & { message: string | undefined | null }) {
  if (!message) return null

  return (
    <p
      {...props}
      className={cn(
        "text-green-600 bg-green-500/10 rounded-xl px-4 py-1.5 text-sm sm:text-base mb-2",
        className,
      )}
    >
      {message}
    </p>
  )
}
