import { cva } from "class-variance-authority"

export const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 font-body font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-50",
	{
		variants: {
			variant: {
				primary: "bg-primary text-white hover:bg-primary/90",
				secondary:
					"bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white",
				ghost: "text-on-surface hover:bg-surface-container",
				gold: "bg-secondary text-white hover:bg-secondary/90",
				none: "bg-transparent text-on-surface hover:bg-surface-container",
			},
			size: {
				sm: "h-9 px-4 text-sm rounded-lg",
				md: "h-11 px-6 text-base rounded-xl",
				lg: "h-13 px-8 text-lg rounded-xl",
				none: "",
			},
		},
		defaultVariants: {
			variant: "primary",
			size: "md",
		},
	},
)
