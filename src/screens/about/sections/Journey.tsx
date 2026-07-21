import { BRANDING } from "@/shared/constants"
import { AnimatePosition, slideUp } from "@/shared/ui/Framer"

export function Journey() {
  return (
    <section className="section-gap">
      <div className="container-app">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <AnimatePosition variants={slideUp}>
            <div>
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-2">
                Our Mission and Vision
              </h2>
              <p className="text-secondary font-semibold text-sm uppercase tracking-wider mb-6">
                The Purpose Behind {BRANDING.name}
              </p>
              <p className="text-on-surface-variant leading-relaxed mb-4">
                Our mission is to make disciples for the Lord Jesus Christ.
                <br />
                We believe that the fruit of making disciples will be seen in
                more souls being saved, converts baptized, lives changed, and
                more churches planted.
              </p>
            </div>
          </AnimatePosition>
        </div>
      </div>
    </section>
  )
}
