import { useCallback, useEffect, useRef, useState } from "react"
import { useMediaQuery } from "@/shared/hooks/useMediaQuery"
import {
  AnimatePresence,
  motion,
  slideUp,
  staggerContainer,
} from "@/shared/ui/Framer"
import { Link } from "@/shared/ui/primitives/button"
import { contactOptions } from "./contactOptions"

export function MobileFloatingCTA() {
  const isMobile = useMediaQuery()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLUListElement>(null)
  const fabRef = useRef<HTMLButtonElement>(null)

  const close = useCallback(() => setIsOpen(false), [])
  const toggle = useCallback(() => setIsOpen((prev) => !prev), [])

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        fabRef.current &&
        !fabRef.current.contains(e.target as Node)
      ) {
        close()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("mousedown", handleClickOutside)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, close])

  if (!isMobile) return null

  return (
    <div className="fixed bottom-0 right-0 z-60 p-4 pb-[env(safe-area-inset-bottom)] pointer-events-none">
      <div className="relative flex flex-col items-end pointer-events-auto">
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                key="overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-50 bg-black/50"
                onClick={close}
                aria-hidden="true"
              />

              <motion.ul
                key="menu"
                ref={menuRef}
                variants={staggerContainer}
                initial="hidden"
                animate="show"
                exit="hidden"
                role="menu"
                className="relative z-60 mb-3 flex flex-col gap-2 items-end"
              >
                {contactOptions.map(({ icon: Icon, href, external, label }) => (
                  <motion.li key={href} variants={slideUp} onClick={close}>
                    <Link
                      href={href}
                      {...(external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="flex items-center gap-3 bg-surface rounded-full pl-5 pr-4 py-3 shadow-lg border border-outline-variant/30 text-on-surface hover:bg-surface-container transition-colors min-h-12"
                    >
                      <span className="text-sm font-medium whitespace-nowrap">
                        {label}
                      </span>
                      <Icon className="size-5 text-primary" />
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </>
          )}
        </AnimatePresence>

        <motion.button
          ref={fabRef}
          onClick={toggle}
          whileTap={{ scale: 0.92 }}
          aria-label={isOpen ? "Close contact menu" : "Contact us"}
          aria-expanded={isOpen}
          aria-haspopup="true"
          className="relative z-60 size-14 mb-8 rounded-full bg-secondary text-white shadow-xl flex items-center justify-center hover:bg-primary/90 transition-colors"
        >
          <motion.span
            className="material-symbols-outlined text-2xl"
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? "close" : "chat"}
          </motion.span>
        </motion.button>
      </div>
    </div>
  )
}
