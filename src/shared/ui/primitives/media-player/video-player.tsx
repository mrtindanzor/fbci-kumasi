import { type ComponentProps, useEffect, useRef, useState } from "react"
import { Spinner } from "@/shared/ui/primitives/Spinner"
import { cn } from "@/shared/utils/cn"

type VideoPlayerProps = {
  url: string
  poster?: string
  autoplay?: boolean
  controls?: boolean
  title?: string
} & ComponentProps<"div">

export function VideoPlayer({
  url,
  poster,
  autoplay = false,
  controls = true,
  title,
  className,
  ...props
}: VideoPlayerProps) {
  const [src, setSrc] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    setSrc(url)
  }, [url])

  return (
    <div
      className={cn("relative w-full h-full bg-black", className)}
      {...props}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <Spinner className="h-8 w-8 border-2 border-white/30 border-t-white" />
        </div>
      )}
      {src && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src={src}
          poster={poster}
          autoPlay={autoplay}
          controls={controls}
          playsInline
          preload="metadata"
          title={title}
          onCanPlay={() => setLoading(false)}
          onError={() => setLoading(false)}
        >
          <track kind="captions" />
        </video>
      )}
    </div>
  )
}
