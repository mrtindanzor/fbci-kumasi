import { motion } from "framer-motion"
import {
  FolderArchive,
  LayoutDashboard,
  LogOut,
  Menu,
  UserPlus,
  X,
} from "lucide-react"
import { useState } from "react"
import { useAuthStore, useLogout } from "@/features/auth"
import { useAuthenticatedUser } from "@/features/user"
import { InviteModal } from "@/screens/dashboard/invite"
import { useMediaQuery } from "@/shared/hooks/useMediaQuery"
import { usePathname } from "@/shared/hooks/usePathname"
import { routes } from "@/shared/routes"
import { motionVariants } from "@/shared/ui/Framer"
import { Logo } from "@/shared/ui/Logo"
import { Button, Link } from "@/shared/ui/primitives/button"
import { cn } from "@/shared/utils/cn"

type NavItem = {
  label: string
  href: string
  icon: React.ElementType
}

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: routes.dashboard.home, icon: LayoutDashboard },
  {
    label: "Projects",
    href: routes.dashboard.projects.home,
    icon: FolderArchive,
  },
]

const getNavVariants = (isOpen: boolean) =>
  motionVariants({
    show: {
      height: isOpen ? "fit-content" : 0,
    },
    hidden: {
      height: isOpen ? 0 : "fit-content",
    },
  })

export function DashboardSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const isMobile = useMediaQuery()
  const isNavOpen = !isMobile || isOpen

  const toggle = () => setIsOpen((o) => !o)

  return (
    <aside
      className={cn(
        "fixed grid grid-rows-[auto_1fr] not-sm:overflow-y-hidden! sm:grid-rows-[auto_1fr_auto] inset-x-0 w-screen left-0 top-0 z-40 sm:w-54 md:w-64 sm:bg-primary-container text-neutral-50",
        isNavOpen && "h-dvh",
      )}
    >
      <div className="hidden sm:flex items-center gap-3 px-6 py-5 *:*:first:h-8">
        <Logo />
      </div>

      <div
        className={cn(
          "overflow-y-auto overflow-x-hidden row-start-2 grid grid-rows-[auto_1fr] ",
          isNavOpen && "min-h-[calc(100dvh-5rem)] sm:min-h-full",
        )}
      >
        <motion.div
          variants={getNavVariants(isNavOpen)}
          initial="hidden"
          animate="show"
          className={cn(
            "border-t border-t-primary grid h-fit bg-primary sm:bg-primary-container",
          )}
        >
          <Navbar setIsOpen={toggle} />
        </motion.div>
        <div
          aria-hidden
          onClick={toggle}
          className="bg-linear-to-b from-primary/30 to-primary/20 size-full sm:hidden"
        />
      </div>

      <div className="row-start-1 sm:row-start-3 bg-primary-container ">
        <SecondaryBar isNavOpen={isNavOpen} setIsOpen={toggle} />
      </div>
    </aside>
  )
}

type NavbarProps = {
  setIsOpen: () => void
}
function Navbar({ setIsOpen }: NavbarProps) {
  const currentPath = usePathname()
  const [inviteOpen, setInviteOpen] = useState(false)
  const roleChecker = useAuthStore((s) => s.roleChecker)
  const canGenerateInvite = roleChecker.add("developer").passes()

  const isActivePath = (path: string) =>
    path === routes.dashboard.home
      ? currentPath === routes.dashboard.home
      : currentPath.startsWith(path)

  return (
    <nav className="grid max-w-full gap-y-2 py-4 px-2">
      {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          variant="none"
          size="none"
          onClick={setIsOpen}
          className={cn(
            "flex items-center gap-3  rounded-xl py-3 text-sm font-medium transition-colors",
            isActivePath(href) && "bg-white/15 text-white",
            !isActivePath(href) &&
              "text-white/70 hover:bg-white/10 hover:text-white",
          )}
        >
          <Icon className="size-5" />

          {label}
        </Link>
      ))}

      {canGenerateInvite && (
        <Button
          variant="none"
          size="none"
          onClick={() => setInviteOpen(true)}
          className={cn(
            "flex items-center gap-3 rounded-xl py-3 text-sm font-medium transition-colors",
            "text-white/70 hover:bg-white/10 hover:text-white",
          )}
        >
          <UserPlus className="size-5" />
          Invite User
        </Button>
      )}

      <InviteModal open={inviteOpen} onClose={() => setInviteOpen(false)} />
    </nav>
  )
}

type SecondaryBarProps = {
  isNavOpen: boolean
  setIsOpen: () => void
}

function SecondaryBar({ isNavOpen, setIsOpen }: SecondaryBarProps) {
  const user = useAuthenticatedUser()
  const { logout: onSignOut } = useLogout()

  return (
    <div className="border-t border-white/10 px-4 py-4">
      <div className="flex items-center gap-3">
        <div className="flex size-9 sm:hidden md:flex items-center justify-center rounded-full bg-secondary text-sm font-semibold text-white">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <p className="truncate text-sm font-medium">{user.name}</p>
          <p className="truncate text-xs text-white/60">{user.email}</p>
        </div>

        <div className="flex *:flex-0 w-fit px-4 sm:px-0 sm:pr-2 gap-x-4">
          <Button
            variant="none"
            size="none"
            className="sm:hidden"
            onClick={setIsOpen}
          >
            {isNavOpen && <X className="size-6" />}
            {!isNavOpen && <Menu className="size-6" />}
          </Button>

          <Button
            type="button"
            variant="none"
            size="none"
            className="text-white/80 hover:text-white"
            onClick={onSignOut}
          >
            <LogOut className="size-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
