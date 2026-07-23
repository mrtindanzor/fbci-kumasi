import { IMAGES } from "@/shared/constants"
import { Footer } from "@/shared/layouts/Footer"
import { Header } from "@/shared/layouts/Header"
import { routes } from "@/shared/routes"
import { AnimatePosition, slideUp } from "@/shared/ui/Framer"
import { BackgroundImage } from "@/shared/ui/primitives/BackgroundImage"
import { Link } from "@/shared/ui/primitives/button"
import { useNavigate } from "../hooks/useNavigate"

export function NotFound() {
  const router = useNavigate()
  return (
    <>
      <Header />
      <main className="relative min-h-screen flex flex-col items-center justify-center bg-background py-30 px-6">
        <div className="relative z-10 max-w-4xl w-full text-center flex flex-col items-center">
          <AnimatePosition
            variants={slideUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="relative w-full h-fit max-w-md mb-6"
          >
            <div className="absolute inset-0 bg-secondary/5 rounded-full scale-110 blur-3xl" />
            <div className="relative w-full h-60 flex items-center justify-center">
              <div className="relative w-full h-full rounded-3xl overflow-hidden soft-sanctuary-shadow">
                <BackgroundImage
                  url={IMAGES.churchSide2}
                  className="opacity-60"
                />
              </div>
              <div className="absolute -top-12 -right-12 md:-right-20 pointer-events-none">
                <span className="font-headline text-[160px] leading-none text-primary/30 select-none font-thin tracking-tighter">
                  404
                </span>
              </div>
            </div>
          </AnimatePosition>

          <AnimatePosition
            variants={slideUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="h-fit grid gap-y-4 max-w-2xl"
          >
            <h1 className="font-headline text-headline-lg md:text-display-lg text-primary">
              Page Not Found
            </h1>
            <p className="font-body text-body-lg text-on-surface-variant px-4">
              The page you're looking for may have been moved, renamed, or no
              longer exists. We're here to help you find your way back.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
              <Link
                href={routes.home}
                variant="primary"
                size="lg"
                className="rounded-full gap-3"
              >
                <span className="material-symbols-outlined">home</span>
                Back to Home
              </Link>
              <button
                type="button"
                onClick={router.back}
                className="flex items-center gap-2 font-body text-secondary hover:text-primary transition-colors underline-offset-8 hover:underline decoration-2"
              >
                <span className="material-symbols-outlined">arrow_back</span>
                Go Back
              </button>
            </div>
          </AnimatePosition>

          <div className="mt-20 pt-10 border-t border-outline-variant/30 w-full grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <Link
              href={routes.about}
              variant="ghost"
              size="none"
              className="px-4 py-2 rounded-xl flex-col"
            >
              <span className="block font-body text-primary hover:text-secondary mb-1">
                Our History
              </span>
              <span className="text-xs text-on-surface-variant">
                About FBCI
              </span>
            </Link>
            <Link
              href={routes.college}
              variant="ghost"
              size="none"
              className="px-4 py-2 rounded-xl flex-col"
            >
              <span className="block font-body text-primary hover:text-secondary mb-1">
                Academics
              </span>
              <span className="text-xs text-on-surface-variant">
                HACWA Courses
              </span>
            </Link>
            <Link
              href={routes.resources.home}
              variant="ghost"
              size="none"
              className="px-4 py-2 rounded-xl flex-col"
            >
              <span className="block font-body text-primary hover:text-secondary mb-1">
                Media
              </span>
              <span className="text-xs text-on-surface-variant">
                Sermon Archives
              </span>
            </Link>
            <Link
              href={routes.contact}
              variant="ghost"
              size="none"
              className="px-4 py-2 rounded-xl flex-col"
            >
              <span className="block font-body text-primary hover:text-secondary mb-1">
                Connect
              </span>
              <span className="text-xs text-on-surface-variant">
                Contact Us
              </span>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
