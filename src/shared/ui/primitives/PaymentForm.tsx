import type { ComponentProps } from "react"
import { cn } from "@/shared/utils/cn"

type PaymentFormProps = ComponentProps<"iframe">

export function PaymentForm({ title, className, ...props }: PaymentFormProps) {
	return (
		<iframe {...props} className={cn("h-350 sm:h-250 w-full", className)} />
	)
}
