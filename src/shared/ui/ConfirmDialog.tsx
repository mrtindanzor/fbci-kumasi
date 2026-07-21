import { useCallback, useEffect } from "react"
import { AnimatePresence, motion } from "@/shared/ui/Framer"
import { Button } from "@/shared/ui/primitives/button"
import { cn } from "@/shared/utils/cn"

type ConfirmDialogProps = {
  open: boolean
  title: string
  description: string
  confirmLabel?: string
  cancelLabel?: string
  variant?: "danger" | "default"
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "default",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel()
    },
    [onCancel],
  )

  useEffect(() => {
    if (open) document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [open, handleKeyDown])

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50"
            onClick={onCancel}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="relative z-10 w-full max-w-md rounded-2xl bg-surface-container-lowest p-6 shadow-xl"
          >
            <h2 className="font-headline text-lg text-on-surface">{title}</h2>
            <p className="mt-2 text-sm text-on-surface-variant">
              {description}
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={onCancel}
              >
                {cancelLabel}
              </Button>
              <Button
                type="button"
                size="sm"
                className={cn(
                  variant === "danger" &&
                    "bg-error text-on-error hover:bg-error/90",
                )}
                onClick={onConfirm}
              >
                {confirmLabel}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
