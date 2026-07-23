import { createFileRoute, Outlet } from "@tanstack/react-router"
import { MobileFloatingCTA } from "@/features/contact/components/MobileFloatingCTA"
import { Footer } from "@/shared/layouts/Footer"
import { Header } from "@/shared/layouts/Header"
import { BackButton } from "@/shared/ui/BackButton"

export const Route = createFileRoute("/__public")({
  component: PublicLayout,
})

function PublicLayout() {
  return (
    <>
      <Header />
      <div className="relative">
        <div className="max-w-7xl z-20 w-full absolute left-1/2 -translate-x-1/2 top-20 pointer-events-none pl-4 pt-4">
          <BackButton variant="primary" className="pointer-events-auto" />
        </div>
        <Outlet />
      </div>
      <Footer />
      <MobileFloatingCTA />
    </>
  )
}
