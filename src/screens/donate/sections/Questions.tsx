import { CHURCH_INFO } from "@/shared/db"
import { AnimatePosition, slideUp } from "@/shared/ui/Framer"
import { Link } from "@/shared/ui/primitives/button"

export function Questions() {
  return (
    <section className="section-gap">
      <div className="container-app max-w-2xl mx-auto">
        <AnimatePosition variants={slideUp}>
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-4">
              Questions about Giving?
            </h2>
            <p className="text-on-surface-variant">
              Our administrative office is here to assist you with any questions
              regarding recurring giving, wire transfers, or stock donations.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link
              size="none"
              variant="none"
              href={`mailto:${CHURCH_INFO.socials.email}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-4 bg-surface rounded-xl border border-outline-variant hover:border-secondary transition-colors group"
            >
              <span className="material-symbols-outlined text-2xl text-secondary">
                mail
              </span>
              <div>
                <p className="text-sm text-on-surface-variant">Email</p>
                <p className="font-semibold text-primary group-hover:text-secondary transition-colors">
                  {CHURCH_INFO.socials.email}
                </p>
              </div>
            </Link>
            <Link
              href={`tel:${CHURCH_INFO.phone}`}
              target="_blank"
              rel="noopener noreferrer"
              size="none"
              variant="none"
              className="flex items-center gap-3 px-6 py-4 bg-surface rounded-xl border border-outline-variant hover:border-secondary transition-colors group"
            >
              <span className="material-symbols-outlined text-2xl text-secondary">
                phone
              </span>
              <div>
                <p className="text-sm text-on-surface-variant">Phone</p>
                <p className="font-semibold text-primary group-hover:text-secondary transition-colors">
                  {CHURCH_INFO.phone}
                </p>
              </div>
            </Link>
          </div>
        </AnimatePosition>
      </div>
    </section>
  )
}
