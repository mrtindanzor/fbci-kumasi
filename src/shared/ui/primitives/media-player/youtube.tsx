import { useState } from "react"
import { Spinner } from "@/shared/ui/primitives/Spinner"
import { cn } from "@/shared/utils/cn"

type YoutubePlayerProps = {
  videoId: string
  title?: string
  poster?: string
  autoplay?: boolean
  controls?: boolean
  className?: string
}

function getYoutubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/,
    /(?:youtube\.com\/embed\/)([\w-]{11})/,
  ]
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1] ?? null
  }
  return null
}

export function YoutubePlayer({
  videoId: _videoId,
  title,
  poster,
  autoplay = false,
  controls = true,
  className,
}: YoutubePlayerProps) {
  const id = getYoutubeId(_videoId) ?? _videoId
  const isValid = Boolean(id)
  const [playing, setPlaying] = useState(autoplay)
  const [loading, setLoading] = useState(true)

  if (!isValid) {
    return (
      <div
        className={cn(
          "w-full h-full bg-black flex items-center justify-center",
          className,
        )}
      >
        <span
          className="material-symbols-outlined text-white/40 text-6xl"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          play_circle
        </span>
      </div>
    )
  }

  if (!playing) {
    return (
      <button
        type="button"
        onClick={() => setPlaying(true)}
        className={cn(
          "relative w-full h-full group cursor-pointer bg-black flex items-center justify-center",
          className,
        )}
        aria-label={`Play${title ? ` ${title}` : ""}`}
      >
        {poster && (
          <img
            src={poster}
            alt={title ?? ""}
            className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
          />
        )}
        <div className="relative z-10 w-20 h-20 bg-secondary rounded-full flex items-center justify-center text-primary shadow-lg group-hover:scale-110 transition-all">
          <span
            className="material-symbols-outlined text-[48px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            play_arrow
          </span>
        </div>
      </button>
    )
  }

  return (
    <div className={cn("relative w-full h-full bg-black", className)}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Spinner className="h-8 w-8 border-2 border-white/30 border-t-white" />
        </div>
      )}
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&controls=${controls ? 1 : 0}&rel=0`}
        title={title ?? "YouTube video"}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
        onLoad={() => setLoading(false)}
        onError={() => setLoading(false)}
      />
    </div>
  )
}

export { getYoutubeId }
