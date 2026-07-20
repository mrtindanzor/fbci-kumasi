import type { PropsWithChildren } from "react"
import { useAuthStore } from "@/features/auth"
import { Spinner } from "@/shared/ui/primitives/Spinner"

export function AwaitAuthLoad({ children }: PropsWithChildren) {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn)

  return (
    <>
      {isLoggedIn && children}
      {!isLoggedIn && (
        <div className="size-screen bg-surface text-on-surface flex items-center justify-center">
          <Spinner className="size-10" />
        </div>
      )}
    </>
  )
}
