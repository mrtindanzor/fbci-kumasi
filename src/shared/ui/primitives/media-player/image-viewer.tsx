import type { ComponentProps } from "react"
import { Image } from "@/shared/ui/primitives/Image"
import { cn } from "@/shared/utils/cn"

type ImageViewerProps = {
	src: string
	alt?: string
} & ComponentProps<"div">

export function ImageViewer({
	src,
	alt = "",
	className,
	...props
}: ImageViewerProps) {
	return (
		<div
			className={cn("relative w-full h-full bg-black", className)}
			{...props}
		>
			<Image
				src={src}
				alt={alt}
				className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
			/>
		</div>
	)
}
