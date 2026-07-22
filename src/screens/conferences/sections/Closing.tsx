import type { Conference } from "@/features/conference"
import { AnimatePosition, slideUp } from "@/shared/ui/Framer"

type ClosingProps = {
  conference: Conference
}

export function Closing({ conference }: ClosingProps) {
  if (!conference.closingMessage) return null

  return (
    <section className="section-gap">
      <div className="container-app">
        <AnimatePosition variants={slideUp}>
          <div className="bg-primary rounded-3xl p-10 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-white leading-relaxed max-w-3xl mx-auto">
              {conference.closingMessage}
            </h2>
          </div>
        </AnimatePosition>
      </div>
    </section>
  )
}
