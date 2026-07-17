import type { TargetAndTransition, Transition, Variants } from "framer-motion"

type MotionVariantsConfig = {
	hidden: TargetAndTransition
	show: TargetAndTransition
}

export function motionVariants({
	show = {},
	hidden = {},
}: MotionVariantsConfig): Variants {
	return {
		hidden: hidden,
		show: {
			...show,
			transition: {
				duration: 0.5,
				ease: "easeOut",
				when: "beforeChildren",
				staggerChildren: 0.1,
				...(show.transition ?? {}),
			} satisfies Transition,
		},
	}
}

export const fadeIn = motionVariants({
	hidden: { opacity: 0 },
	show: { opacity: 1 },
})

export const slideUp = motionVariants({
	hidden: { opacity: 0, y: 20 },
	show: { opacity: 1, y: 0 },
})

export const slideInLeft = motionVariants({
	hidden: { opacity: 0, x: -20 },
	show: { opacity: 1, x: 0 },
})

export const slideInRight = motionVariants({
	hidden: { opacity: 0, x: 20 },
	show: { opacity: 1, x: 0 },
})

export const staggerContainer: Variants = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
}
