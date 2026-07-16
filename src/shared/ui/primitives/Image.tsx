import type { ComponentProps } from "react"
import { cn } from "@/shared/utils/cn"

type ImageProps = ComponentProps<"img"> & {
	fallback?: string
}

export function Image({ className, fallback, alt, src, ...props }: ImageProps) {
	return (
		<img
			className={cn("object-cover", className)}
			alt={alt}
			src={src ?? fallback}
			loading="lazy"
			{...props}
		/>
	)
}
