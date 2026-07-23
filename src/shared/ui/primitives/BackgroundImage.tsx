import type { ComponentProps } from "react"
import { cn } from "@/shared/utils/cn"

type BackgroundImageProps = {
  url: string
} & ComponentProps<"div">

export function BackgroundImage({
  url,
  className,
  ...props
}: BackgroundImageProps) {
  return (
    <div {...props} className={cn("absolute inset-0 opacity-50", className)}>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${url}')`,
        }}
      />
    </div>
  )
}
