import type { ComponentProps } from "react"
import { cn } from "@/shared/utils/cn"

export function Input({ className, ...props }: ComponentProps<"input">) {
	return (
		<input
			className={cn(
				"h-11 w-full rounded-xl border border-outline-variant bg-surface px-4 text-on-surface placeholder:text-on-surface-variant focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors",
				className,
			)}
			{...props}
		/>
	)
}
