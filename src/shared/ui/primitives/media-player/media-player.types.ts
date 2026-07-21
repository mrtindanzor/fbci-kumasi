export type MediaPlayerSource =
  | { type: "youtube"; url: string; poster?: string }
  | { type: "image"; src: string }
  | { type: "video"; url: string; poster?: string }

export type MediaPlayerProps = {
  media: MediaPlayerSource
  title?: string
  autoplay?: boolean
  controls?: boolean
  aspectRatio?: string
  rounded?: "none" | "lg" | "xl" | "full"
  fullWidth?: boolean
  className?: string
}
