import { ArrowRight } from "lucide-react"
import { routes } from "@/shared/routes"
import { AnimatePosition, slideUp } from "@/shared/ui/Framer"
import { Link } from "@/shared/ui/primitives/button"

export function CallToAction() {
  return (
    <section className="section-gap py-0 mb-20">
      <div className="container-app">
        <AnimatePosition variants={slideUp}>
          <div className="rounded-2xl px-10 py-2 text-center">
            <span className="material-symbols-outlined text-5xl text-secondary mb-4 block">
              history
            </span>
            <h2 className="text-2xl md:text-3xl font-headline font-bold text-primary mb-4">
              Want to see the impact of your previous gifts?
            </h2>
            <p className="text-on-surface-variant max-w-xl mx-auto mb-8">
              Transparency is the cornerstone of our community. Explore the
              history of our successful missions and see how lives have been
              transformed.
            </p>
            <Link
              variant="none"
              href={routes.projects.funded}
              type="button"
              className="inline-flex items-center gap-2 text-secondary font-semibold hover:underline"
            >
              View Funded Projects
              <ArrowRight className="size-4.5" />
            </Link>
          </div>
        </AnimatePosition>
      </div>
    </section>
  )
}
