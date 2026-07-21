import type { PropsWithChildren } from "react"
import { Logo } from "@/shared/ui/Logo"
import { BackgroundImage } from "@/shared/ui/primitives/BackgroundImage"

export function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row">{children}</div>
  )
}

export function AuthFormPanel({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 lg:px-16">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-col items-center gap-y-0.5 rounded-xl bg-primary py-1 shadow-lg">
            <Logo />
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}

export function AuthDecorativePanel({ imageSrc }: { imageSrc: string }) {
  return (
    <div className="relative hidden lg:flex flex-1 items-center justify-center bg-linear-to-br from-primary to-primary-container p-8">
      <BackgroundImage url={imageSrc} />
    </div>
  )
}
