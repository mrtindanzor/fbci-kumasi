import { createFileRoute, Outlet } from "@tanstack/react-router"
import { MobileFloatingCTA } from "@/features/contact/components/MobileFloatingCTA"
import { Footer } from "@/shared/layouts/Footer"
import { Header } from "@/shared/layouts/Header"
import { BackButton } from "@/shared/ui/BackButton"
import { AnimatePosition, motionVariants } from "@/shared/ui/Framer"

export const Route = createFileRoute("/__public")({
  component: PublicLayout,
})

const buttonVariants = motionVariants({
  hidden: { opacity: 0, x: "-40%" },
  show: { opacity: 1, x: 0 },
})

function PublicLayout() {
  return (
    <>
      <Header />
      <div className="relative">
        <AnimatePosition
          variants={buttonVariants}
          initial="hidden"
          animate="show"
          className="max-w-7xl z-20 w-full absolute left-1/2 -translate-x-1/2 top-20 pointer-events-none pl-4 pt-4"
        >
          <BackButton variant="primary" className="pointer-events-auto" />
        </AnimatePosition>
        <Outlet />
      </div>
      <Footer />
      <MobileFloatingCTA />
    </>
  )
}
