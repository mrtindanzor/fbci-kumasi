"use client"

import { CheckSquare, Copy } from "lucide-react"
import { Button } from "@/shared/ui/primitives/button"
import { cn } from "@/shared/utils/cn"
import type { CopyToClipBoardProps } from "./copy.types"
import { useCopy } from "./useCopy"

export default function CopyToClipboard({
  text,
  className,
  ...props
}: CopyToClipBoardProps) {
  const { copied, doCopy } = useCopy()

  return (
    <div {...props} className={cn("flex justify-end mb-2", className)}>
      <Button
        disabled={copied}
        variant="none"
        onClick={() => doCopy(text)}
        className="p-0! rounded-none!"
        title={copied ? "Copied" : "Copy to clipboard"}
      >
        {!copied && <Copy className="size-5" />}
        {copied && <CheckSquare className="size-5" />}
      </Button>
    </div>
  )
}
