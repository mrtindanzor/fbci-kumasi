import { useInvite } from "@/features/auth/invite"
import CopyToClipboard from "@/shared/ui/CopyToClipBoard/CopyToClipboard"
import { AnimatePresence, motion } from "@/shared/ui/Framer"
import { Button } from "@/shared/ui/primitives/button"
import { Input } from "@/shared/ui/primitives/Input"
import { Spinner } from "@/shared/ui/primitives/Spinner"
import { Link, RefreshCw } from "lucide-react"
import { useCallback, useEffect } from "react"

type InviteModalProps = {
  open: boolean
  onClose: () => void
}

export function InviteModal({ open, onClose }: InviteModalProps) {
  const { handleGenerate, handleGenerateNew, generatedUrl, isLoading, error } =
    useInvite()

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    },
    [onClose],
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
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="relative z-10 w-full max-w-md rounded-2xl bg-surface-container-lowest p-6 shadow-xl"
          >
            <div className="flex items-center gap-2">
              <Link className="size-5 text-on-surface" />
              <h2 className="font-headline text-lg text-on-surface">
                Generate Invitation Link
              </h2>
            </div>
            <p className="mt-2 text-sm text-on-surface-variant">
              Share this link to allow someone to create an account.
            </p>

            {error && (
              <p className="mt-3 rounded-xl bg-error-container p-3 text-sm text-on-error-container">
                {error}
              </p>
            )}

            {generatedUrl && (
              <div className="mt-4 space-y-3">
                <div className="flex gap-2">
                  <Input readOnly value={generatedUrl} className="text-sm" />
                  <CopyToClipboard
                    className="bg-primary px-2.5 rounded-xl"
                    text={generatedUrl}
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleGenerateNew}
                  >
                    <RefreshCw className="size-4 mr-1" />
                    Generate New
                  </Button>
                  <Button type="button" size="sm" onClick={onClose}>
                    Close
                  </Button>
                </div>
              </div>
            )}

            {!generatedUrl && (
              <div className="mt-4 flex justify-end gap-3">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  size="sm"
                  onClick={handleGenerate}
                  disabled={isLoading}
                >
                  {isLoading && <Spinner className="mr-2 size-4" />}
                  Generate Link
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
