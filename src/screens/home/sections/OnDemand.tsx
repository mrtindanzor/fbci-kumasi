import { ExternalLink } from "lucide-react"
import { AnimatePosition, slideUp } from "@/shared/ui/Framer"
import { Link } from "@/shared/ui/primitives/button"
import { Player } from "@/shared/ui/primitives/PodbeanPlayer"

const sources = [
  "https://45b0d593-e76f-4149-bcd8-a3755e2d03f9.htmlcomponentservice.com/get_draft?id=45b0d5_af7c353f77233bc6d92a6afb8b7cd210.html",
  "https://www.podbean.com/player-v2/?i=zstd8-2604e7-pbblog-playlist&share=1&download=1&rtl=0&fonts=Arial&skin=1&font-color=auto&logo_link=episode_page&order=episodic&limit=10&filter=all&ss=a713390a017602015775e868a2cf26b0&btn-skin=7&size=315",
] as const

export function OnDemand() {
  return (
    <section className="section-gap bg-primary-container text-white">
      <div className="container-app">
        <AnimatePosition variants={slideUp}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-white capitalize mb-2">
                Listen to our Pastor's most recent messages
              </h2>
              <p className="text-white/70">Latest Sermons & Podcasts</p>
            </div>
            <Link
              href="https://tedspeer.podbean.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 font-semibold hover:underline"
            >
              View Full Library
            </Link>
          </div>

          <p className="text-white/70 max-w-2xl mb-8">
            You can listen here or go to Podbean
          </p>

          <ul className="grid md:grid-cols-2 gap-gutter">
            {sources.map((src) => (
              <Player key={src} src={src} />
            ))}
          </ul>

          <Link
            href="https://tedspeer.podbean.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex sm:hidden w-fit mx-auto px-8 mt-6 items-center gap-2 font-semibold hover:underline"
          >
            View Full Library <ExternalLink className="size-4" />
          </Link>
        </AnimatePosition>
      </div>
    </section>
  )
}
