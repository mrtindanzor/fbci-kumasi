import { Eye, EyeOff } from "lucide-react"
import type { ComponentProps } from "react"
import { useState } from "react"
import { Button } from "@/shared/ui/primitives/button"
import { Input } from "@/shared/ui/primitives/Input"
import { cn } from "@/shared/utils/cn"

export function PasswordInput({
  className,
  ...props
}: ComponentProps<"input">) {
  const [visible, setVisible] = useState(false)

  return (
    <div className="relative">
      <Input
        type={visible ? "text" : "password"}
        className={cn("pr-10", className)}
        {...props}
      />
      <Button
        type="button"
        variant="ghost"
        size="none"
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-on-surface-variant hover:text-on-surface"
        onClick={() => setVisible(!visible)}
        tabIndex={-1}
      >
        {visible ? <EyeOff size={20} /> : <Eye size={20} />}
      </Button>
    </div>
  )
}
