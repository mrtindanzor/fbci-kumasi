import { ALBUMS, MusicPlayer } from "@/features/music"
import { AnimatePosition, slideUp } from "@/shared/ui/Framer"

export function MusicSection() {
  return (
    <section id="music" className="section-gap">
      <div className="container-app max-w-4xl mx-auto">
        <AnimatePosition variants={slideUp}>
          <div className="mb-10">
            <span className="material-symbols-outlined text-5xl md:text-6xl text-secondary mb-5 block">
              music_note
            </span>
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-4">
              Christian Music
            </h2>
            <p className="text-on-surface-variant max-w-2xl">
              Listen to or download free Christian music from our church members
              and friends. Each album is available as individual tracks or as a
              complete ZIP download.
            </p>
          </div>
        </AnimatePosition>

        <div className="space-y-12">
          {ALBUMS.map((album) => (
            <MusicPlayer key={album.id} album={album} />
          ))}
        </div>
      </div>
    </section>
  )
}
