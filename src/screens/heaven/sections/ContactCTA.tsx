import { AnimatePosition, slideUp } from "@/shared/ui/Framer"
import { Button } from "@/shared/ui/primitives/button"

export function ContactCTA() {
  return (
    <section className="section-gap bg-primary">
      <div className="container-app">
        <AnimatePosition variants={slideUp}>
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-white mb-8">
              Take the Next Step Together
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="gold" size="lg">
                Visit Our Sanctuary
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                Join a Small Group
              </Button>
            </div>
          </div>
        </AnimatePosition>
      </div>
    </section>
  )
}
