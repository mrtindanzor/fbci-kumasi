import { X } from "lucide-react"
import { usePathname } from "@/shared/hooks/usePathname"
import { AnimatePresence, motion } from "@/shared/ui/Framer"
import { cn } from "@/shared/utils/cn"
import { routes } from "../../routes"
import { Logo } from "../../ui/Logo"
import { Button, Link } from "../../ui/primitives/button"
import { NAV_ITEMS } from "../constants"

type MobileNavProps = {
  open: boolean
  onClose: () => void
}

const MOBILE_NAV_LINKS = NAV_ITEMS.flatMap((item) =>
  item.children ? item.children : [item],
)

export function MobileNav({ open, onClose }: MobileNavProps) {
  const pathname = usePathname()

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
                <ul>
                  {MOBILE_NAV_LINKS.map(({ href, label }) => (
                    <li key={href}>
                      <Link
                        key={href}
                        href={href}
                        onClick={onClose}
                        variant="none"
                        size="none"
                        className={cn(
                          "flex justify-start py-3 text-left font-medium transition-colors border-b border-outline-variant/20",
                          pathname === href && "text-primary font-bold",
                          pathname !== href &&
                            "text-on-surface hover:text-primary",
                        )}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
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
