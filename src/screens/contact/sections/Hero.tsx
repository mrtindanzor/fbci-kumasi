import { AnimatePosition, slideInLeft, slideUp } from "@/shared/ui/Framer"

export function Hero() {
  return (
    <section className="relative min-h-50 pt-header-claim flex items-center bg-linear-to-br from-primary to-primary-container overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[url('/images/church-side-2.avif')] bg-cover bg-center" />
      </div>

      <div className="container-app relative z-10 py-20">
        <AnimatePosition variants={slideInLeft}>
          <h1 className="text-4xl md:text-6xl font-headline font-bold text-white leading-tight mb-4">
            Get In Touch
          </h1>
        </AnimatePosition>

        <AnimatePosition variants={slideUp} className="max-w-xl">
          <p className="text-neutral-200">
            We always enjoy connecting with people from our community and
            beyond. If you have any questions, comments, prayer requests, or
            would like more information, don't hesitate to get in touch. You can
            reach us using any of the contact methods listed below.
          </p>
        </AnimatePosition>
      </div>
    </section>
  )
}
