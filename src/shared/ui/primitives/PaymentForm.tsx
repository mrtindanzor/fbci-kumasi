import type { ComponentProps } from "react"
import { cn } from "@/shared/utils/cn"

type PaymentFormProps = ComponentProps<"iframe">

export function PaymentForm({ title, className, ...props }: PaymentFormProps) {
	return <iframe {...props} className={cn("size-full", className)} />
}
