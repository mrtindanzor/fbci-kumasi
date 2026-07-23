import { Download } from "lucide-react"
import { AnimatePosition, slideUp } from "@/shared/ui/Framer"
import { Link } from "@/shared/ui/primitives/button"
import type { Album } from "../music.contract.types"

type AlbumCardProps = {
  album: Album
}

export function AlbumCard({ album }: AlbumCardProps) {
  return (
    <AnimatePosition variants={slideUp}>
      <div className="flex flex-col sm:flex-row gap-6 items-start">
        <div className="w-full sm:w-48 h-48 rounded-xl overflow-hidden bg-surface-container flex-shrink-0">
          <img
            src={album.coverImage}
            alt={`${album.title} cover`}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <span className="text-xs text-on-surface-variant uppercase tracking-wider font-label mb-1 block">
            {album.artist}
          </span>
          <h3 className="text-xl md:text-2xl font-headline font-bold text-primary mb-2">
            {album.title}
          </h3>
          <p className="text-sm text-on-surface-variant mb-4">
            {album.description}
          </p>
          <p className="text-xs text-on-surface-variant mb-4">
            {album.tracks.length}{" "}
            {album.tracks.length === 1 ? "track" : "tracks"}
          </p>

          <Link
            href={album.zipDownload}
            download
            variant="secondary"
            size="sm"
            className="gap-1.5"
          >
            <Download className="size-4" />
            Download Album
          </Link>
        </div>
      </div>
    </AnimatePosition>
  )
}
