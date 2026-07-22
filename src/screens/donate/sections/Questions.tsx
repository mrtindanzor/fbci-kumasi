import { AnimatePosition, slideUp } from "@/shared/ui/Framer"
import { Link } from "@/shared/ui/primitives/button"
import { CONTACT_OPTIONS } from "../constants"

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

          <ul className="flex flex-col sm:flex-row justify-center gap-6">
            {CONTACT_OPTIONS.map(({ icon: Icon, title, link, value }) => (
              <ContactCard
                key={title}
                icon={Icon}
                title={title}
                link={link}
                value={value}
              />
            ))}
          </ul>
        </AnimatePosition>
      </div>
    </section>
  )
}

type ContactCardProps = {
  icon: React.ElementType
  title: string
  link: string
  value: string
}
function ContactCard({ icon: Icon, title, link, value }: ContactCardProps) {
  return (
    <li>
      <Link
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        size="none"
        variant="none"
        className="grid grid-cols-[auto_1fr] items-center gap-3 px-6 py-4 bg-surface rounded-xl border border-outline-variant hover:border-secondary transition-colors group"
      >
        <Icon className="text-secondary" title={title} />
        <div>
          <p className="font-semibold text-primary group-hover:text-secondary transition-colors">
            {value}
          </p>
        </div>
      </Link>
    </li>
  )
}
