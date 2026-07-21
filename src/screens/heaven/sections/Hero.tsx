import { AnimatePosition, slideUp } from "@/shared/ui/Framer"

const faqLinks = [
  "Are you sure you would go to Heaven?",
  "If you died today, where would you go?",
  "Do you want to know for sure you would go to Heaven if you were to die? Don't live another day without getting that settled!",
]

export function Hero() {
  return (
    <section className="relative min-h-150 pt-header-claim flex items-center bg-linear-to-br from-primary/40 to-primary-container overflow-hidden">
      <div className="absolute inset-0 opacity-15">
        <div className="absolute inset-0 bg-[url('/images/heaven-page-bg.avif')] bg-cover bg-center" />
      </div>

      <div className="container-app relative z-10 py-20">
        <AnimatePosition variants={slideUp} className="max-w-2xl">
          <p className="text-secondary font-semibold text-sm tracking-wider uppercase mb-4">
            {faqLinks[0]}
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold text-white leading-tight mb-4">
            {faqLinks[1]}
          </h1>
          <p className="text-lg text-white/80 mb-8 max-w-lg">{faqLinks[2]}</p>
        </AnimatePosition>
      </div>
    </section>
  )
}
