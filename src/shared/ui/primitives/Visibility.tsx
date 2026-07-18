import type { PropsWithChildren } from "react"

type VisibilityProps = PropsWithChildren<{
  show: boolean
}>

export function Visibility({ show, children }: VisibilityProps) {
  if (!show) return null
  return <>{children}</>
}
