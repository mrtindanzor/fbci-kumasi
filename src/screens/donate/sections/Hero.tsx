import { routes } from "@/shared/routes"
import { AnimatePosition, slideInLeft, slideUp } from "@/shared/ui/Framer"
import { Link } from "@/shared/ui/primitives/button"

export function Hero() {
  return (
    <section className="relative min-h-[60vh] pt-header-claim flex items-center bg-linear-to-br from-primary to-primary-container overflow-hidden">
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-[url('/images/church-side-3.avif')] bg-cover bg-center" />
      </div>

      <div className="container-app relative z-10 py-20">
        <AnimatePosition variants={slideInLeft} className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-headline font-bold text-white leading-tight mb-6">
            Support the Eternal Work of God
          </h1>
        </AnimatePosition>

        <AnimatePosition variants={slideUp} className="max-w-xl">
          <p className="text-lg text-white/80 mb-8">
            Your stewardship enables us to spread the Gospel across nations,
            support theological education at HACWA, and maintain our commitment
            to biblical truth.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href={routes.donate.overseas}
              className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-white rounded-xl font-semibold hover:bg-secondary/90 transition-colors"
            >
              Donate from USA
              <span className="material-symbols-outlined text-lg">
                arrow_forward
              </span>
            </Link>
            <Link
              href={routes.donate.local}
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 transition-colors"
            >
              Donate from Ghana
              <span className="material-symbols-outlined text-lg">
                south_east
              </span>
            </Link>
          </div>
        </AnimatePosition>
      </div>
    </section>
  )
}
