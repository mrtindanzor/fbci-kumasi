import { CHURCH_INFO } from "@/shared/db"
import { AnimatePosition, slideUp } from "@/shared/ui/Framer"
import { Link } from "@/shared/ui/primitives/button"
import { ExternalLink } from "lucide-react"

export function YouTubeSection() {
  return (
    <section
      id="youtube"
      className="section-gap pt-0 bg-linear-to-b from-background to-red-50/30"
    >
      <div className="container-app max-w-4xl mx-auto text-center">
        <AnimatePosition variants={slideUp}>
          <div className="inline-flex items-center justify-center bg-red-50 rounded-full p-4 mb-6">
            <span className="material-symbols-outlined text-5xl md:text-6xl text-red-600">
              play_circle
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-4">
            Fundamental Hour
          </h2>

          <p className="text-on-surface-variant max-w-2xl mx-auto mb-8 leading-relaxed">
            Watch biblical preaching, teaching, and ministry content from
            Fundamental Baptist Church International on our YouTube channel.
          </p>

          <Link
            href={CHURCH_INFO.socials.youtube}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            size="lg"
            className="bg-red-600 hover:bg-red-700 gap-2"
          >
            Visit Our YouTube Channel
            <ExternalLink className="size-5" />
          </Link>
        </AnimatePosition>
      </div>
    </section>
  )
}
