import { IMAGES } from "@/shared/constants"
import { AnimatePosition, slideUp } from "@/shared/ui/Framer"
import { Image } from "@/shared/ui/primitives/Image"

export function PosterSection() {
  return (
    <section className="py-8">
      <div className="container-app">
        <AnimatePosition variants={slideUp}>
          <Image
            src={IMAGES.hacwaPoster}
            alt="HACWA College Poster"
            className="w-auto h-80 sm:h-140 object-contain mx-auto rounded-lg"
          />
        </AnimatePosition>
      </div>
    </section>
  )
}
