import { Download, Pause, Play } from "lucide-react"
import { Button } from "@/shared/ui/primitives/button"
import { cn } from "@/shared/utils/cn"
import type { Track } from "../music.contract.types"

type TrackItemProps = {
  track: Track
  index: number
  isActive: boolean
  isPlaying: boolean
  onPlay: () => void
  onDownload: () => void
}

export function TrackItem({
  track,
  index,
  isActive,
  isPlaying,
  onPlay,
  onDownload,
}: TrackItemProps) {
  const PlayIcon = isPlaying && isActive ? Pause : Play

  return (
    <li
      className={cn(
        "grid grid-cols-[1fr_auto] items-center gap-4 px-4 py-1 transition-colors",
        isActive
          ? "bg-surface-container border-l-2 border-secondary"
          : "hover:bg-surface-container",
      )}
    >
      {/** biome-ignore lint/a11y/noStaticElementInteractions: Allows clicking on the entire row to play **/}
      <div
        onKeyUp={() => onPlay()}
        onClick={onPlay}
        className="flex items-center gap-4 px-4 py-3 transition-colors"
      >
        <span
          className={cn(
            "w-8 text-center font-label text-sm",
            isActive
              ? "text-secondary font-semibold"
              : "text-on-surface-variant",
          )}
        >
          {index + 1}
        </span>

        <Button
          variant="ghost"
          size="none"
          onClick={onPlay}
          className="shrink-0"
          aria-label={isPlaying && isActive ? "Pause" : "Play"}
        >
          <PlayIcon className="size-5 text-secondary" />
        </Button>

        <span
          className={cn(
            "flex-1 font-body text-sm",
            isActive ? "text-secondary font-medium" : "text-on-surface",
          )}
        >
          {track.title}
        </span>
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={onDownload}
        className="shrink-0"
        aria-label="Download"
      >
        <Download className="size-4 text-on-surface-variant" />
      </Button>
    </li>
  )
}
