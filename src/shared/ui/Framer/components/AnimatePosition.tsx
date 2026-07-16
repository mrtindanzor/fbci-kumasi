"use client"

import { type HTMLMotionProps, motion } from "framer-motion"
import { forwardRef } from "react"

type AnimatePositionProps = HTMLMotionProps<"div"> & {
	viewport?: {
		once?: boolean
		margin?: string
	}
}

export const AnimatePosition = forwardRef<HTMLDivElement, AnimatePositionProps>(
	function AnimatePosition({ children, viewport, ...props }, ref) {
		return (
			<motion.div
				ref={ref}
				initial="hidden"
				whileInView="show"
				viewport={viewport ?? { once: true }}
				{...props}
			>
				{children}
			</motion.div>
		)
	},
)
