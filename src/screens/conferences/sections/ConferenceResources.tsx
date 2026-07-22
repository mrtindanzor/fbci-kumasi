import { motion } from "framer-motion"
import { Download } from "lucide-react"
import type { Conference, ConferenceResource } from "@/features/conference"
import { AnimatePosition, slideUp, staggerContainer } from "@/shared/ui/Framer"
import { Link } from "@/shared/ui/primitives/button"

type ConferenceResourcesProps = {
  conference: Conference
}

export function ConferenceResources({ conference }: ConferenceResourcesProps) {
  if (conference.resources.length === 0) return null

  return (
    <section className="section-gap bg-surface-container">
      <div className="container-app">
        <AnimatePosition variants={slideUp}>
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-2">
            Conference Resources
          </h2>
          <div className="w-8 h-0.5 bg-secondary rounded-full mb-12" />
        </AnimatePosition>

        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {conference.resources.map((resource) => (
            <ResourceCard key={resource.id} {...resource} />
          ))}
        </motion.ul>
      </div>
    </section>
  )
}

function ResourceCard({ title, file, size }: ConferenceResource) {
  return (
    <motion.li
      variants={slideUp}
      className="bg-surface rounded-2xl p-6 border border-outline-variant/30"
    >
      <div className="flex items-start gap-3 mb-4">
        <span className="material-symbols-outlined text-3xl text-secondary">
          picture_as_pdf
        </span>
        <div className="min-w-0">
          <h3 className="font-headline font-semibold text-primary truncate">
            {title}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-on-surface-variant uppercase tracking-wider">
              PDF
            </span>
            {size && (
              <>
                <span className="text-on-surface-variant/30">·</span>
                <span className="text-xs text-on-surface-variant">{size}</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Link
          href={file}
          download
          variant="none"
          size="none"
          className="inline-flex items-center gap-1.5 h-9 px-4 rounded-lg bg-primary text-white text-sm hover:bg-primary/90 transition-colors duration-200"
        >
          <Download className="size-4" />
          Download
        </Link>
      </div>
    </motion.li>
  )
}
