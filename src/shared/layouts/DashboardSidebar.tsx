import { LogOut } from "lucide-react"
import { useLogout } from "@/features/auth"
import { useAuthenticatedUser } from "@/features/user"
import { routes } from "@/shared/routes"
import { Logo } from "@/shared/ui/Logo"
import { Button, Link } from "@/shared/ui/primitives/button"
import { cn } from "@/shared/utils/cn"
import { usePathname } from "../hooks/usePathname"

type NavItem = {
  label: string
  href: string
  icon: string
}

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: routes.dashboard.home, icon: "dashboard" },
  {
    label: "Projects",
    href: routes.dashboard.projects.home,
    icon: "folder_shared",
  },
]

export function DashboardSidebar() {
  const currentPath = usePathname()
  const user = useAuthenticatedUser()
  const { logout } = useLogout()

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col bg-primary-container text-white">
      <div className="flex items-center gap-3 px-6 py-5">
        <Logo />
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === "/"
              ? currentPath === "/"
              : currentPath.startsWith(item.href)

          return (
            <Link
              key={item.href}
              href={item.href}
              variant="none"
              size="none"
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                isActive
                  ? "bg-white/15 text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white",
              )}
            >
              <span className="material-symbols-outlined text-xl">
                {item.icon}
              </span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-white/10 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-white">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-medium">{user.name}</p>
            <p className="truncate text-xs text-white/60">{user.email}</p>
          </div>
          <Button
            type="button"
            variant="none"
            size="none"
            className="text-white/60 hover:text-white"
            onClick={() => logout()}
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </aside>
  )
}
