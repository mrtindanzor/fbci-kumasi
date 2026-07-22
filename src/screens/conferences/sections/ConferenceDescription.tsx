import type { Conference } from "@/features/conference"
import { AnimatePosition, slideUp } from "@/shared/ui/Framer"

type ConferenceDescriptionProps = {
  conference: Conference
}

export function ConferenceDescription({
  conference,
}: ConferenceDescriptionProps) {
  return (
    <section className="section-gap">
      <div className="container-app max-w-3xl mx-auto">
        <AnimatePosition variants={slideUp}>
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-2">
            About the Conference
          </h2>
          <div className="w-8 h-0.5 bg-secondary rounded-full mb-8" />

          <p className="text-on-surface-variant leading-relaxed text-lg">
            {conference.fullDescription}
          </p>
        </AnimatePosition>
      </div>
    </section>
  )
}
