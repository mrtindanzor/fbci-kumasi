import { useNavigate } from "@/shared/hooks/useNavigate"
import { usePathname } from "@/shared/hooks/usePathname"
import { routes } from "@/shared/routes"
import { Button } from "@/shared/ui/primitives/button"
import { cn } from "../utils/cn"
import type { ButtonProps } from "./primitives/button/types"

export function BackButton({ className, ...props }: ButtonProps) {
  const navigate = useNavigate()
  const pathname = usePathname()

  if (pathname === routes.home) return null

  const handleBack = () => {
    if (window.history.length <= 1) {
      navigate.push(routes.home)
    } else {
      navigate.back()
    }
  }

  return (
    <Button
      onClick={handleBack}
      variant="ghost"
      size="sm"
      {...props}
      aria-label="Go back to previous page"
      className={cn("h-auto px-2 py-1.5 gap-1", className)}
    >
      <span className="material-symbols-outlined text-lg">chevron_left</span>
      <span className="inline">Back</span>
    </Button>
  )
}
