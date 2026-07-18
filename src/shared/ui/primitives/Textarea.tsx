import type { ComponentProps } from "react"
import { cn } from "@/shared/utils/cn"

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
	return (
		<textarea
			className={cn(
				"w-full rounded-xl border border-outline-variant bg-surface px-4 py-3 text-on-surface placeholder:text-on-surface-variant focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors resize-none",
				className,
			)}
			{...props}
		/>
	)
}
