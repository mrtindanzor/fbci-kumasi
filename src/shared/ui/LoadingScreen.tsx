import { motion, useAnimation, useReducedMotion } from "framer-motion"
import { useLayoutEffect, useState } from "react"
import { useMediaQuery } from "@/shared/hooks/useMediaQuery"
import { Image } from "@/shared/ui/primitives/Image"

const TIMING = {
  logoRotate: 0.6,
  logoHold: 500,
  logoFadeOut: 0.4,
  curtainOpen: 0.8,
} as const

const ease = [0.4, 0, 0.2, 1] as const

export function LoadingScreen() {
  const isMobile = useMediaQuery({ size: "sm", comparison: "<" })
  const prefersReducedMotion = useReducedMotion()
  const [phase, setPhase] = useState<"running" | "done">("running")

  const leftCurtain = useAnimation()
  const rightCurtain = useAnimation()
  const logo = useAnimation()
  const backdrop = useAnimation()

  useLayoutEffect(() => {
    let cancelled = false

    const animatePhase = async (cb: Promise<unknown>) => {
      if (cancelled) return
      await cb
    }

    const prevOverflow = document.body.style.overflowY
    document.body.style.overflowY = "hidden"

    async function sequence() {
      await animatePhase(
        logo.start({
          rotate: 360,
          transition: { duration: TIMING.logoRotate, ease: "easeOut" },
        }),
      )

      await animatePhase(
        backdrop.start({
          opacity: 0,
        }),
      )

      await animatePhase(new Promise((r) => setTimeout(r, TIMING.logoHold)))

      await animatePhase(
        logo.start({
          opacity: 1,
          transition: { duration: TIMING.logoFadeOut },
        }),
      )
      await animatePhase(
        logo.start({
          opacity: 0,
          transition: { duration: 0.2 },
        }),
      )

      await animatePhase(
        Promise.all([
          leftCurtain.start({
            x: "-100%",
            transition: { duration: TIMING.curtainOpen, ease },
          }),
          rightCurtain.start({
            x: "100%",
            transition: { duration: TIMING.curtainOpen, ease },
          }),
        ]),
      )

      if (cancelled) return

      document.body.style.overflowY = prevOverflow
      setPhase("done")
    }

    sequence()

    return () => {
      cancelled = true
      document.body.style.overflowY = prevOverflow
    }
  }, [leftCurtain, backdrop, rightCurtain, logo])

  return (
    <>
      <motion.div
        className="fixed inset-0 bg-surface z-20"
        initial={{ opacity: 1 }}
        animate={backdrop}
        hidden={!isMobile || prefersReducedMotion || phase === "done"}
      />

      <div
        hidden={!isMobile || prefersReducedMotion || phase === "done"}
        className="fixed inset-0 z-100 pointer-events-auto"
      >
        <div className="absolute inset-0 flex">
          <motion.div
            className="w-1/2 h-full bg-surface will-change-transform"
            initial={{ x: "0%" }}
            animate={leftCurtain}
          />
          <motion.div
            className="w-1/2 h-full bg-surface will-change-transform"
            initial={{ x: "0%" }}
            animate={rightCurtain}
          />
        </div>

        <div className="relative z-10 flex items-center justify-center h-full">
          <motion.div
            className="will-change-transform"
            initial={{ rotate: 115 }}
            animate={logo}
          >
            <Image src="/icon-loading.png" alt="Loading" className="size-40" />
          </motion.div>
        </div>
      </div>
    </>
  )
}
