import type { ComponentProps } from "react"
import { cn } from "@/shared/utils/cn"

type MImageProps = ComponentProps<"img"> & {
	fallback?: string
}

export function MImage({
	className,
	fallback,
	alt,
	src,
	...props
}: MImageProps) {
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
