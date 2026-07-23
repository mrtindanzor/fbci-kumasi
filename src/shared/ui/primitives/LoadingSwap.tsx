import type { ComponentProps } from "react"
import { Spinner } from "./Spinner"

type LoadingSwapProps = {
  isLoading: boolean
  children: React.ReactNode
}
export function LoadingSwap({
  isLoading,
  children,
  ...props
}: LoadingSwapProps & ComponentProps<"span">) {
  return isLoading ? <Spinner {...props} /> : children
}
