import { AnimatePosition, slideUp } from "@/shared/ui/Framer"
import { Link } from "@/shared/ui/primitives/button"
import { CATEGORIES } from "../constants"

export function Categories() {
  return (
    <section className=" py-8 bg-surface-container">
      <div className="container-app">
        <AnimatePosition variants={slideUp}>
          <ul className="flex flex-wrap items-center gap-3">
            {CATEGORIES.map(({ url, name }) => (
              <li key={name}>
                <Link
                  href={url}
                  variant="secondary"
                  className="px-4 py-2 text-sm font-label uppercase tracking-wider rounded-full border border-outline-variant "
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </AnimatePosition>
      </div>
    </section>
  )
}
