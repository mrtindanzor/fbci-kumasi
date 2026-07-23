import { Pause, Play, SkipBack, SkipForward } from "lucide-react"
import { Button } from "@/shared/ui/primitives/button"
import type { PlayerState } from "../hooks/useAudioPlayer"

type PlayerBarProps = {
  state: PlayerState
  onTogglePlay: () => void
  onNext: () => void
  onPrev: () => void
  onSeek: (percent: number) => void
}

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds)) return "0:00"
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, "0")}`
}

export function PlayerBar({
  state,
  onTogglePlay,
  onNext,
  onPrev,
  onSeek,
}: PlayerBarProps) {
  if (!state.currentTrack) return null

  return (
    <div className="sticky bottom-0 rounded-b-2xl bg-surface-container border-t border-outline-variant backdrop-blur-sm">
      <div className="container-app px-4 py-3">
        <div className="flex items-center gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-primary truncate">
              {state.currentTrack.title}
            </p>
            <p className="text-xs text-on-surface-variant">
              {formatTime(state.currentTime)} / {formatTime(state.duration)}
            </p>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={onPrev}
              aria-label="Previous"
            >
              <SkipBack className="size-5 text-on-surface-variant" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={onTogglePlay}
              aria-label={state.isPlaying ? "Pause" : "Play"}
            >
              {state.isPlaying ? (
                <Pause className="size-5 text-primary" />
              ) : (
                <Play className="size-5 text-primary" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={onNext}
              aria-label="Next"
            >
              <SkipForward className="size-5 text-on-surface-variant" />
            </Button>
          </div>
        </div>

        <div className="mt-2">
          <div
            className="relative h-1 bg-outline-variant rounded-full cursor-pointer group"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect()
              const percent = ((e.clientX - rect.left) / rect.width) * 100
              onSeek(Math.max(0, Math.min(100, percent)))
            }}
            role="slider"
            aria-label="Seek"
            aria-valuenow={Math.round(state.progress)}
            aria-valuemin={0}
            aria-valuemax={100}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight")
                onSeek(Math.min(100, state.progress + 5))
              if (e.key === "ArrowLeft") onSeek(Math.max(0, state.progress - 5))
            }}
          >
            <div
              className="absolute inset-y-0 left-0 bg-secondary rounded-full transition-[width] duration-100"
              style={{ width: `${state.progress}%` }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-secondary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ left: `calc(${state.progress}% - 6px)` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
