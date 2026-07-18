import { ChevronDown, X } from "lucide-react"
import { useEffect, useState } from "react"
import { usePathname } from "@/shared/hooks/usePathname"
import { AnimatePresence, motion } from "@/shared/ui/Framer"
import { cn } from "@/shared/utils/cn"
import { routes } from "../../routes"
import { Logo } from "../../ui/Logo"
import { Button, Link } from "../../ui/primitives/button"
import { NAV_ITEMS, type NavItem } from "../constants"

type MobileNavProps = {
  open: boolean
  onClose: () => void
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  const pathname = usePathname()
  const [expanded, setExpanded] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (!open) return
    const activeGroup = NAV_ITEMS.find((item) =>
      item.children?.some((child) => child.href === pathname),
    )
    if (activeGroup) {
      setExpanded(new Set([activeGroup.label]))
    }
  }, [open, pathname])

  function toggleGroup(label: string) {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(label)) {
        next.delete(label)
      } else {
        next.add(label)
      }
      return next
    })
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 lg:hidden"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-50 w-80 max-w-[85vw] border-l border-outline-variant bg-surface shadow-xl l:hidden"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between border-b border-outline-variant bg-primary px-2 py-5">
                <Logo />
                <Button
                  variant="none"
                  onClick={onClose}
                  size="none"
                  className="p-1 text-neutral-300 transition-colors hover:bg-none"
                >
                  <X className="size-8" />
                </Button>
              </div>

              <nav className="flex-1 overflow-y-auto p-5">
                {NAV_ITEMS.map((item) =>
                  item.children ? (
                    <ExpandableGroup
                      key={item.label}
                      item={item}
                      expanded={expanded.has(item.label)}
                      onToggle={() => toggleGroup(item.label)}
                      currentPath={pathname}
                      onNavigate={onClose}
                    />
                  ) : (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      variant="none"
                      size="none"
                      className={cn(
                        "flex justify-start py-3 text-left font-medium transition-colors border-b border-outline-variant/20",
                        pathname === item.href
                          ? "text-primary font-semibold"
                          : "text-on-surface hover:text-primary",
                      )}
                    >
                      {item.label}
                    </Link>
                  ),
                )}
              </nav>

              <div className="border-t border-outline-variant p-5">
                <Link
                  href={routes.projects.home}
                  onClick={onClose}
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary font-semibold text-white transition-colors hover:bg-primary/90"
                >
                  Projects
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

type ExpandableGroupProps = {
  item: NavItem
  expanded: boolean
  onToggle: () => void
  currentPath: string
  onNavigate: () => void
}

function ExpandableGroup({
  item,
  expanded,
  onToggle,
  currentPath,
  onNavigate,
}: ExpandableGroupProps) {
  const isGroupActive = item.children?.some(
    (child) => child.href === currentPath,
  )

  return (
    <div className="border-b border-outline-variant/20">
      <Button
        type="button"
        onClick={onToggle}
        variant="none"
        size="none"
        className={cn(
          "flex w-full items-center justify-between gap-2 py-3 font-medium transition-colors",
          isGroupActive ? "text-primary" : "text-on-surface hover:text-primary",
        )}
        aria-expanded={expanded}
      >
        {item.label}
        <ChevronDown
          className={cn(
            "size-4 transition-transform duration-200",
            expanded && "rotate-180",
          )}
        />
      </Button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            {item.children?.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                onClick={onNavigate}
                variant="none"
                size="none"
                className={cn(
                  "block py-2.5 pl-8 pr-4 text-sm transition-colors",
                  child.href === currentPath
                    ? "text-primary font-semibold"
                    : "text-on-surface-variant hover:text-primary",
                )}
              >
                {child.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
