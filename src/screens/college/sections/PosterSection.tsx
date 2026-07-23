import { IMAGES } from "@/shared/constants"
import { AnimatePosition, slideUp } from "@/shared/ui/Framer"
import { Image } from "@/shared/ui/primitives/Image"

export function PosterSection() {
  return (
    <section className="section-gap">
      <div className="container-app">
        <AnimatePosition variants={slideUp}>
          <Image
            src={IMAGES.hacwaPoster}
            alt="HACWA College Poster"
            className="w-auto h-200 mx-auto rounded-2xl"
          />
        </AnimatePosition>
      </div>
    </section>
  )
}
