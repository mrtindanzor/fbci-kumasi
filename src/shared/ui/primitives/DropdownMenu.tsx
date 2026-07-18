import { ChevronDown } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "@/shared/ui/Framer"
import { Button, Link } from "@/shared/ui/primitives/button"
import { cn } from "@/shared/utils/cn"

type DropdownItem = {
  label: string
  href: string
}

type DropdownMenuProps = {
  label: string
  items: DropdownItem[]
  currentPath?: string
}

export function DropdownMenu({ label, items, currentPath }: DropdownMenuProps) {
  const { setOpen, isActive, ref, open, handleKeyDown, itemsRef } = useDropdown(
    items,
    currentPath,
  )

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: dropdown container needs hover events
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Button
        type="button"
        onClick={() => setOpen((p) => !p)}
        variant="none"
        size="none"
        className={cn(
          "flex items-center gap-1 text-sm px-3 py-1! rounded-lg font-medium transition-colors",
          isActive
            ? "text-primary bg-surface"
            : "text-neutral-300 hover:bg-white/15",
        )}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {label}
        <ChevronDown
          className={cn(
            "size-3.5 transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </Button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scaleY: 0.95 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -4, scaleY: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            role="menu"
            onKeyDown={handleKeyDown}
            className="absolute left-1/2 -translate-x-1/2 top-full mt-2 min-w-44 bg-surface rounded-xl shadow-xl border border-outline-variant py-2 origin-top"
          >
            {items.map((item, index) => (
              <Link
                key={item.href}
                ref={(el) => {
                  itemsRef.current[index] = el
                }}
                href={item.href}
                variant="none"
                size="none"
                role="menuitem"
                tabIndex={-1}
                className={cn(
                  "block w-full text-left px-4 py-2 text-sm transition-colors",
                  item.href === currentPath
                    ? "text-primary font-semibold bg-surface-container"
                    : "text-on-surface hover:bg-surface-container-high",
                )}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function useDropdown(items: DropdownItem[], currentPath?: string) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<(HTMLAnchorElement | null)[]>([])

  const isActive = items.some((item) => item.href === currentPath)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!open) return

      const currentIndex = itemsRef.current.indexOf(
        document.activeElement as HTMLAnchorElement,
      )

      if (e.key === "ArrowDown") {
        e.preventDefault()
        const next = currentIndex < items.length - 1 ? currentIndex + 1 : 0
        itemsRef.current[next]?.focus()
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        const prev = currentIndex > 0 ? currentIndex - 1 : items.length - 1
        itemsRef.current[prev]?.focus()
      }
    },
    [open, items.length],
  )

  return { open, setOpen, ref, itemsRef, isActive, handleKeyDown }
}
