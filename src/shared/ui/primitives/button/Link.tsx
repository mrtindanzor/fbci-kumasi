import {
	Link as TanstackLink,
	type LinkProps as TanstackLinkProps,
} from "@tanstack/react-router"
import type { ComponentProps } from "react"
import type { ExtractVariantsTypes } from "@/shared/types/utils/ExtractVariants"
import { cn } from "@/shared/utils/cn"
import { buttonVariants } from "./constants"

type LinkVariants = ExtractVariantsTypes<typeof buttonVariants>

type LinkProps = ComponentProps<"a"> &
	Omit<TanstackLinkProps, "className" | "children"> & {
		className?: string
		children?: React.ReactNode
		isActive?: boolean
	} & LinkVariants

export function Link({
	className,
	isActive,
	href,
	variant,
	size,
	...props
}: LinkProps) {
	return (
		<TanstackLink
			// biome-ignore lint/suspicious/noExplicitAny: I do not need the tanstack type
			to={href as any}
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	)
}
