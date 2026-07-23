import { CHURCH_INFO } from "@/shared/db"
import { routes } from "@/shared/routes"
import { AnimatePosition, slideUp } from "@/shared/ui/Framer"
import { Link } from "@/shared/ui/primitives/button"

export function CallToAction() {
  return (
    <section className="section-gap bg-surface-container">
      <div className="container-app">
        <AnimatePosition variants={slideUp}>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-4">
              Take Your Next Step
            </h2>
            <p className="text-on-surface-variant mb-8">
              Whether you're looking for a new home or just curious about our
              beliefs, we'd love to connect with you.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <Link href={routes.contact} variant="primary" size="lg">
                Contact Us
              </Link>
            </div>

            <div className="flex flex-wrap gap-8 items-start max-w-2xl mx-auto w-fit">
              <div className="h-fit grid gap-y-2 mx-auto">
                <p className="font-semibold justify-center gap-x-2 flex items-end text-primary">
                  <span className="material-symbols-outlined text-secondary">
                    calendar_month
                  </span>{" "}
                  Visit Us
                </p>
                <ul className="grid gap-y-1.5">
                  {CHURCH_INFO.serviceTimes.map((service) => (
                    <li
                      key={service.day}
                      className="flex items-center gap-3 text-on-surface-variant"
                    >
                      <div className="mx-auto">
                        <p className="text-sm">
                          {service.day} {service.time}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-end gap-3 mx-auto text-on-surface-variant">
                <div className="text-left">
                  <div className="flex justify-center items-end gap-2">
                    <span className="material-symbols-outlined text-secondary">
                      favorite
                    </span>
                    <p className="font-semibold text-primary text-sm">Give</p>
                  </div>
                  <p className="text-sm">Support our mission</p>
                </div>
              </div>
            </div>
          </div>
        </AnimatePosition>
      </div>
    </section>
  )
}
