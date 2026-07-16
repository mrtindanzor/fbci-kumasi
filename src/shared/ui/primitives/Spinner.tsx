import type { ComponentProps } from "react"
import { cn } from "@/shared/utils/cn"

export function Spinner({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			className={cn(
				"h-6 w-6 animate-spin rounded-full border-2 border-outline-variant border-t-primary",
				className,
			)}
			{...props}
		/>
	)
}
