import { cn } from "@/shared/utils/cn"
import { buttonVariants } from "./constants"
import type { PillProps } from "./types"

export function Pill({ variant, size, className, x, y, ...props }: PillProps) {
  return (
    <span
      className={cn(buttonVariants({ variant, size, x, y, className }))}
      {...props}
    />
  )
}
