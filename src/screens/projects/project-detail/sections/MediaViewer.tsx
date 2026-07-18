import { useCallback, useEffect, useRef, useState } from "react"
import type { Project } from "@/features/project"
import { AnimatePosition, slideUp } from "@/shared/ui/Framer"
import { Image } from "@/shared/ui/primitives/Image"
import { MediaPlayer } from "@/shared/ui/primitives/media-player"
import { cn } from "@/shared/utils/cn"

type MediaViewerProps = {
  project: Project
}

export function MediaViewer({ project }: MediaViewerProps) {
  const hasVideo = Boolean(project.videoUrl)
  const images = project.galleryImages

  const [activeMedia, setActiveMedia] = useState<"video" | number>(
    hasVideo ? "video" : 0,
  )

  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const checkScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 4)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4)
  }, [])

  const hasContent = hasVideo || images.length > 0

  const thumbs: { type: "video" | "image"; index?: number }[] = []
  if (hasVideo) thumbs.push({ type: "video" })
  for (let i = 0; i < images.length; i++) {
    thumbs.push({ type: "image", index: i })
  }

  const scrollLeft = () =>
    scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" })

  const scrollRight = () =>
    scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" })

  useEffect(() => {
    checkScroll()
    const el = scrollRef.current
    if (!el) return
    el.addEventListener("scroll", checkScroll)
    const observer = new ResizeObserver(checkScroll)
    observer.observe(el)
    return () => {
      el.removeEventListener("scroll", checkScroll)
      observer.disconnect()
    }
  }, [checkScroll])

  useEffect(() => {
    const timeout = setTimeout(checkScroll, 300)
    return () => clearTimeout(timeout)
  }, [checkScroll])

  if (!hasContent) return null

  return (
    <AnimatePosition variants={slideUp}>
      <div className="space-y-4">
        <MediaPlayer
          media={
            activeMedia === "video"
              ? {
                  type: "video",
                  url: project.videoUrl ?? "",
                  poster: project.image,
                }
              : { type: "image", src: images[activeMedia] }
          }
          title={project.title}
          rounded="xl"
          fullWidth
        />

        <div className="relative">
          <div
            className={cn(
              "absolute left-0 inset-y-0 w-12 bg-linear-to-r from-background to-transparent pointer-events-none z-10 transition-opacity duration-200",
              !canScrollLeft && "opacity-0",
            )}
          />
          <button
            type="button"
            onClick={scrollLeft}
            className={cn(
              "absolute left-1 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-secondary text-primary shadow-lg flex items-center justify-center transition-opacity duration-200 hover:scale-110 active:scale-95",
              !canScrollLeft && "opacity-0 pointer-events-none",
            )}
            aria-label="Scroll thumbnails left"
          >
            <span className="material-symbols-outlined text-lg">
              chevron_left
            </span>
          </button>

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide"
          >
            {thumbs.map((thumb) => {
              const isActive =
                thumb.type === "video"
                  ? activeMedia === "video"
                  : activeMedia === thumb.index
              const thumbSrc =
                thumb.type === "video"
                  ? project.image
                  : images[thumb.index ?? 0]

              return (
                <button
                  key={`${thumb.type}-${thumb.index ?? 0}`}
                  type="button"
                  onClick={() =>
                    setActiveMedia(
                      thumb.type === "video" ? "video" : (thumb.index ?? 0),
                    )
                  }
                  className={cn(
                    "relative aspect-video w-40 shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-200",
                    isActive
                      ? "border-secondary ring-2 ring-secondary/30"
                      : "border-outline-variant hover:border-on-surface-variant",
                  )}
                >
                  <Image
                    src={thumbSrc}
                    alt={
                      thumb.type === "video"
                        ? "Video"
                        : `Image ${(thumb.index ?? 0) + 1}`
                    }
                    className="w-full h-full object-cover"
                  />
                  {thumb.type === "video" && (
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <span
                        className="material-symbols-outlined text-white text-lg"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        play_arrow
                      </span>
                    </div>
                  )}
                </button>
              )
            })}
          </div>

          <div
            className={cn(
              "absolute right-0 inset-y-0 w-12 bg-linear-to-l from-background to-transparent pointer-events-none z-10 transition-opacity duration-200",
              !canScrollRight && "opacity-0",
            )}
          />
          <button
            type="button"
            onClick={scrollRight}
            className={cn(
              "absolute right-1 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-secondary text-primary shadow-lg flex items-center justify-center transition-opacity duration-200 hover:scale-110 active:scale-95",
              !canScrollRight && "opacity-0 pointer-events-none",
            )}
            aria-label="Scroll thumbnails right"
          >
            <span className="material-symbols-outlined text-lg">
              chevron_right
            </span>
          </button>
        </div>
      </div>
    </AnimatePosition>
  )
}
