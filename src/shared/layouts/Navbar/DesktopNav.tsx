import { usePathname } from "@/shared/hooks/usePathname"
import { Link } from "@/shared/ui/primitives/button"
import { DropdownMenu } from "@/shared/ui/primitives/DropdownMenu"
import { cn } from "@/shared/utils/cn"
import { NAV_ITEMS } from "../constants"

export function DesktopNav() {
	const pathname = usePathname()

	return (
		<nav className="hidden lg:flex border border-surface/40 items-center gap-1 rounded-full bg-primary-container px-1.5 py-1.5 shadow-lg">
			{NAV_ITEMS.map((item) => {
				if (item.children)
					return (
						<DropdownMenu
							key={item.label}
							label={item.label}
							items={item.children}
							currentPath={pathname}
						/>
					)

				return (
					<Link
						key={item.href}
						href={item.href}
						variant="none"
						size="none"
						className={cn(
							"text-sm px-3 py-1.5 rounded-3xl font-medium transition-colors",
							pathname === item.href
								? "text-primary bg-surface"
								: "text-neutral-300 hover:bg-white/10",
						)}
					>
						{item.label}
					</Link>
				)
			})}
		</nav>
	)
}
