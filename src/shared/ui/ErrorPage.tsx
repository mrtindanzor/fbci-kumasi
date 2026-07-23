import { IMAGES } from "@/shared/constants"
import { Footer } from "@/shared/layouts/Footer"
import { Header } from "@/shared/layouts/Header"
import { routes } from "@/shared/routes/routes"
import { AnimatePosition, slideUp } from "@/shared/ui/Framer"
import { BackgroundImage } from "@/shared/ui/primitives/BackgroundImage"
import { Button, Link } from "@/shared/ui/primitives/button"

type ErrorPageProps = {
  reset: () => void
}
export function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <>
      <Header />
      <main className="grow flex items-center justify-center py-30 px-6">
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <AnimatePosition
            variants={slideUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="relative flex justify-center"
          >
            <div className="w-full aspect-square rounded-[40px] overflow-hidden soft-sanctuary-shadow bg-surface-container-low flex items-center justify-center p-8 border border-outline-variant/20">
              <div className="relative w-full h-full rounded-xl overflow-hidden">
                <BackgroundImage
                  url={IMAGES.churchSide3}
                  className="opacity-60"
                />
              </div>
              <div className="absolute -top-4 -right-4 bg-white p-4 rounded-2xl shadow-lg border border-outline-variant/10">
                <span className="material-symbols-outlined text-secondary scale-150">
                  auto_awesome
                </span>
              </div>
            </div>
          </AnimatePosition>

          <AnimatePosition
            variants={slideUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-8 text-center md:text-left"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary-container text-on-secondary-container font-body text-sm font-semibold">
                <span className="material-symbols-outlined text-sm">info</span>
                System Message
              </div>
              <h1 className="font-headline text-headline-lg text-primary">
                Something Went Wrong
              </h1>
              <p className="font-body text-body-lg text-on-surface-variant leading-relaxed">
                We encountered an unexpected problem while loading this page.
                Please try again or return to our homepage. If the problem
                persists, feel free to contact us.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
              <Button
                variant="primary"
                size="lg"
                onClick={reset}
                className="gap-2"
              >
                <span className="material-symbols-outlined">refresh</span>
                Try Again
              </Button>
              <Link
                href={routes.home}
                variant="secondary"
                size="lg"
                className="gap-2"
              >
                <span className="material-symbols-outlined">home</span>
                Back to Home
              </Link>
            </div>

            <div className="pt-4 border-t border-outline-variant/30">
              <Link
                href={routes.contact}
                variant="ghost"
                size="none"
                className="inline-flex items-center gap-2 text-secondary font-body hover:underline underline-offset-4 transition-all"
              >
                <span className="material-symbols-outlined">
                  contact_support
                </span>
                Contact Support
              </Link>
            </div>
          </AnimatePosition>
        </div>
      </main>
      <Footer />
    </>
  )
}
