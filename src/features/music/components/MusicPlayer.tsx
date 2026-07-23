import { useCallback } from "react"
import { cn } from "@/shared/utils/cn"
import { useAudioPlayer } from "../hooks/useAudioPlayer"
import type { Album } from "../music.contract.types"
import { AlbumCard } from "./AlbumCard"
import { EmptyState } from "./EmptyState"
import { PlayerBar } from "./PlayerBar"
import { TrackList } from "./TrackList"

type MusicPlayerProps = {
  album: Album
  className?: string
}

export function MusicPlayer({ album, className }: MusicPlayerProps) {
  const { state, play, togglePlay, seek, next, prev } = useAudioPlayer(
    album.tracks,
  )

  const handleDownload = useCallback((track: (typeof album.tracks)[number]) => {
    const link = document.createElement("a")
    link.href = track.src
    link.download = track.title
    link.click()
  }, [])

  if (album.tracks.length === 0) {
    return <EmptyState />
  }

  return (
    <div
      className={cn(
        "border rounded-2xl overflow-hidden grid h-fit grid-rows-[auto_1fr_auto] gap-y-2 p-1",
        className,
      )}
    >
      <AlbumCard album={album} />

      <div className="overflow-y-auto max-h-60">
        <TrackList
          tracks={album.tracks}
          currentTrackId={state.currentTrack?.id ?? null}
          isPlaying={state.isPlaying}
          onPlay={play}
          onDownload={handleDownload}
        />
      </div>

      <PlayerBar
        state={state}
        onTogglePlay={togglePlay}
        onNext={next}
        onPrev={prev}
        onSeek={seek}
      />
    </div>
  )
}
