import { IMAGES } from "@/shared/constants"
import { AnimatePosition, slideInLeft, slideUp } from "@/shared/ui/Framer"
import { BackgroundImage } from "@/shared/ui/primitives/BackgroundImage"

export function Hero() {
  return (
    <section className="relative min-h-[60vh] pt-header-claim flex items-center bg-linear-to-br from-primary to-primary-container overflow-hidden">
      <BackgroundImage url={IMAGES.churchSide2} className="opacity-40" />

      <div className="container-app relative z-10 py-20">
        <AnimatePosition variants={slideInLeft} className="max-w-2xl">
          <span className="text-secondary font-label text-sm tracking-widest uppercase mb-4 block">
            Victory through Faith
          </span>
          <h1 className="text-4xl md:text-6xl font-headline font-bold text-white leading-tight mb-6">
            Our Funded Missions
          </h1>
        </AnimatePosition>

        <AnimatePosition variants={slideUp} className="max-w-2xl">
          <p className="text-lg text-white/80 max-w-lg">
            Witness the power of collective faith. Through your generous
            support, these vital ministry projects have been fully funded and
            are actively transforming lives across West Africa.
          </p>
        </AnimatePosition>
      </div>
    </section>
  )
}
