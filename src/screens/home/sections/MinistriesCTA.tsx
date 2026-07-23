import { routes } from "@/shared/routes"
import { AnimatePosition, slideUp } from "@/shared/ui/Framer"
import { Link } from "@/shared/ui/primitives/button"

export function MinistriesCTA() {
  return (
    <section className="section-gap">
      <div className="container-app">
        <AnimatePosition variants={slideUp}>
          <div className="bg-surface-container rounded-3xl p-10 md:p-16 text-center border border-outline-variant/30">
            <span className="material-symbols-outlined text-5xl text-secondary mb-5 block">
              diversity_3
            </span>
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-4">
              Explore All Our Ministries
            </h2>
            <p className="text-on-surface-variant max-w-xl mx-auto mb-8 leading-relaxed">
              From TV and radio preaching to Bible college and personal soul
              winning — discover the many ways our church is sharing the gospel
              across Kumasi and beyond.
            </p>
            <Link
              href={routes.ministries}
              variant="primary"
              size="lg"
              className="font-label"
            >
              View All Ministries
              <span className="material-symbols-outlined text-lg">
                arrow_forward
              </span>
            </Link>
          </div>
        </AnimatePosition>
      </div>
    </section>
  )
}
