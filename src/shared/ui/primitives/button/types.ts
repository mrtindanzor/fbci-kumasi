import { cva, type VariantProps } from "class-variance-authority"
import type { ComponentProps } from "react"
import { cn } from "@/shared/utils/cn"

export type ButtonVariants = {
	variant?: "primary" | "secondary" | "ghost" | "gold"
	size?: "sm" | "md" | "lg"
}
