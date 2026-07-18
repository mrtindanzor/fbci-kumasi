import type { ExtractVariantsTypes } from "@/shared/types/utils/ExtractVariants"
import { cn } from "@/shared/utils/cn"
import { Link as TanstackLink } from "@tanstack/react-router"
import { buttonVariants } from "./constants"
import type { LinkProps } from "./types"

type LinkVariants = ExtractVariantsTypes<typeof buttonVariants>

function isExternal(
  href?: string,
  target?: string,
  download?: string | boolean,
): boolean {
  if (target || download) return true
  if (!href) return false
  return (
    href.startsWith("http") ||
    href.startsWith("tel:") ||
    href.startsWith("mailto:") ||
    href.startsWith("#")
  )
}

export function Link({
  className,
  isActive,
  href,
  variant,
  size,
  x,
  y,
  target,
  download,
  rel,
  ...props
}: LinkProps) {
  const classes = cn(buttonVariants({ variant, size, y, x, className }))

  if (
    isExternal(
      href,
      target as string | undefined,
      download as string | boolean | undefined,
    )
  ) {
    const externalRel =
      target === "_blank" ? (rel ?? "noopener noreferrer") : rel
    return (
      <a
        href={href}
        className={classes}
        target={target as string | undefined}
        download={download as string | boolean | undefined}
        rel={externalRel}
        {...props}
      />
    )
  }

  return (
    <TanstackLink
      // biome-ignore lint/suspicious/noExplicitAny: I do not need the tanstack type
      to={href as any}
      className={classes}
      target={target as string | undefined}
      download={download as string | boolean | undefined}
      rel={rel}
      {...props}
    />
  )
}
