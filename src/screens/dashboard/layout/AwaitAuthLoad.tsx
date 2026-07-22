import type { PropsWithChildren } from "react"
import { useAuthStore } from "@/features/auth"
import { Spinner } from "@/shared/ui/primitives/Spinner"

export function AwaitAuthLoad({ children }: PropsWithChildren) {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn)
  const hasRefreshed = useAuthStore((s) => s.hasRefreshed)

  return (
    <>
      {isLoggedIn && children}
      {!hasRefreshed && (
        <div className="h-vh w-screen bg-surface text-on-surfacer">
          <Spinner className="size-20 border-5 fixed top-4/10 left-1/2 -translate-1/2" />
        </div>
      )}
    </>
  )
}
