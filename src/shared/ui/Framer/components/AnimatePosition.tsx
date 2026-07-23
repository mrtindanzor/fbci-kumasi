import { type HTMLMotionProps, motion } from "framer-motion"

type AnimatePositionProps = HTMLMotionProps<"div"> & {
  viewport?: {
    once?: boolean
    margin?: string
  }
}

export function AnimatePosition({ children, ...props }: AnimatePositionProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
