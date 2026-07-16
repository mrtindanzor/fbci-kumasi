export const BUTTON_VARIANTS = {
	variant: {
		primary: "bg-primary text-white hover:bg-primary/90",
		secondary:
			"bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white",
		ghost: "text-on-surface hover:bg-surface-container",
		gold: "bg-secondary text-white hover:bg-secondary/90",
	},
	size: {
		sm: "h-9 px-4 text-sm rounded-lg",
		md: "h-11 px-6 text-base rounded-xl",
		lg: "h-13 px-8 text-lg rounded-xl",
	},
} as const
