import { createFileRoute, Outlet } from "@tanstack/react-router"
import { Footer } from "@/shared/layouts/Footer"
import { Header } from "@/shared/layouts/Header"

export const Route = createFileRoute("/__public")({
  component: PublicLayout,
})

function PublicLayout() {
  return (
    <>
      <Header />
      <div className="">
        <Outlet />
      </div>
      <Footer />
    </>
  )
}
