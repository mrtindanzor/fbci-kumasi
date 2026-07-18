import { useEffect, useRef, useState } from "react"
import { AnimatePosition, slideUp } from "@/shared/ui/Framer"
import { Spinner } from "@/shared/ui/primitives/Spinner"
import { cn } from "@/shared/utils/cn"
import { ImageViewer } from "./image-viewer"
import type { MediaPlayerProps } from "./media-player.types"
import { VideoPlayer } from "./video-player"
import { YoutubePlayer } from "./youtube"

const roundedMap = {
  none: "rounded-none",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
} as const

export function MediaPlayer({
  media,
  title,
  autoplay = false,
  controls = true,
  aspectRatio = "16 / 9",
  rounded = "xl",
  fullWidth = false,
  className,
}: MediaPlayerProps) {
  const [loading, setLoading] = useState(true)
  const mountedRef = useRef(false)

  useEffect(() => {
    setLoading(true)
    void media

    mountedRef.current = true
    const timer = setTimeout(() => {
      if (mountedRef.current) setLoading(false)
    }, 600)
    return () => {
      mountedRef.current = false
      clearTimeout(timer)
    }
  }, [media])

  return (
    <AnimatePosition variants={slideUp}>
      <div
        className={cn(
          "relative overflow-hidden shadow-xl border border-outline-variant bg-black",
          roundedMap[rounded],
          fullWidth && "w-full",
          className,
        )}
        style={{ aspectRatio }}
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <Spinner className="h-8 w-8 border-2 border-white/30 border-t-white" />
          </div>
        )}

        {media.type === "youtube" && (
          <YoutubePlayer
            videoId={media.url}
            title={title}
            poster={media.poster}
            autoplay={autoplay}
            controls={controls}
          />
        )}

        {media.type === "image" && (
          <ImageViewer src={media.src} alt={title ?? ""} />
        )}

        {media.type === "video" && (
          <VideoPlayer
            url={media.url}
            poster={media.poster}
            autoplay={autoplay}
            controls={controls}
            title={title}
          />
        )}
      </div>
    </AnimatePosition>
  )
}
