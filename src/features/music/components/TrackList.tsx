import { AnimatePosition, slideUp } from "@/shared/ui/Framer"
import type { Track } from "../music.contract.types"
import { TrackItem } from "./TrackItem"

type TrackListProps = {
  tracks: Track[]
  currentTrackId: string | null
  isPlaying: boolean
  onPlay: (track: Track) => void
  onDownload: (track: Track) => void
}

export function TrackList({
  tracks,
  currentTrackId,
  isPlaying,
  onPlay,
  onDownload,
}: TrackListProps) {
  return (
    <AnimatePosition variants={slideUp}>
      <ul className="grid gap-y-0.5">
        {tracks.map((track, index) => (
          <TrackItem
            key={track.id}
            track={track}
            index={index}
            isActive={track.id === currentTrackId}
            isPlaying={isPlaying}
            onPlay={() => onPlay(track)}
            onDownload={() => onDownload(track)}
          />
        ))}
      </ul>
    </AnimatePosition>
  )
}
