import { routes } from "@/shared/routes"
import { AnimatePosition, slideUp } from "@/shared/ui/Framer"
import { Link } from "@/shared/ui/primitives/button"

export function HeavenCTA() {
  return (
    <section className="relative w-full py-8 grid min-h-app-height">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/images/are-you-saved.avif')] bg-cover bg-center" />
      </div>
      <div className="absolute inset-0 bg-linear-to-b from-primary/20 via-primary/40 to-primary/80" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-margin-mobile md:px-margin-desktop text-center">
        <AnimatePosition variants={slideUp}>
          <span className="material-symbols-outlined text-6xl md:text-7xl text-secondary mb-6 block">
            church
          </span>
          <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl text-white font-bold max-w-4xl mx-auto leading-tight drop-shadow-lg">
            Do You Know How to Go to Heaven?
          </h2>
          <p className="mt-8 text-neutral-50 max-w-2xl mx-auto leading-relaxed">
            The Bible teaches that you can know for certain you have eternal
            life. Discover the simple truth about salvation and find the peace
            that comes from knowing your destiny.
          </p>
          <div className="mt-10  *:animate-bounce hover:*:animate-none w-fit mx-auto">
            <Link
              href={routes.heaven}
              variant="gold"
              size="lg"
              className="font-label"
            >
              Learn How to Go to Heaven
              <span className="material-symbols-outlined text-lg">
                arrow_forward
              </span>
            </Link>
          </div>
        </AnimatePosition>
      </div>
    </section>
  )
}
