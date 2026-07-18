import type { ComponentProps } from "react"
import { cn } from "@/shared/utils/cn"

export function Label({ className, ...props }: ComponentProps<"label">) {
	return (
		// biome-ignore lint/a11y/noLabelWithoutControl: Label is a generic primitive; association is handled at the usage site
		<label
			className={cn(
				"block text-sm font-medium text-on-surface mb-1",
				className,
			)}
			{...props}
		/>
	)
}
