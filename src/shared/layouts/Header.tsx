import { Link } from "@tanstack/react-router"
import { useState } from "react"
import { BRANDING } from "@/shared/constants"
import { routes } from "@/shared/routes"
import { Button } from "@/shared/ui/primitives/button"
import { Image } from "../ui/primitives/Image"
import { navLinks } from "./constants"
import { MobileNav } from "./MobileNav"

export function Header() {
	const [mobileOpen, setMobileOpen] = useState(false)

	return (
		<header className="sticky top-0 z-50 bg-primary-container *:text-neutral-200">
			<div className="container-app flex h-16 items-center justify-between">
				<Link to="/" className="flex items-center">
					<Image src="/logo.png" alt={BRANDING.name} className="h-10 w-auto" />
				</Link>

				<nav className="hidden md:flex items-center gap-6">
					{navLinks.map((link) => (
						<Link
							key={link.href}
							to={link.href as never}
							className="text-sm font-medium hover:text-primary transition-colors"
						>
							{link.label}
						</Link>
					))}
				</nav>

				<div className="hidden md:flex items-center gap-3">
					<Button variant="ghost" size="sm">
						<span className="material-symbols-outlined text-lg">call</span>
					</Button>
					<Button variant="ghost" size="sm">
						<span className="material-symbols-outlined text-lg">mail</span>
					</Button>
					<Link to={routes.projects}>
						<Button variant="gold" size="sm">
							Projects
						</Button>
					</Link>
					<Button variant="primary" size="sm">
						Donate
					</Button>
				</div>

				<button
					type="button"
					className=" material-symbols-outlined md:hidden! text-2xl text-primary"
					onClick={() => setMobileOpen(true)}
				>
					menu
				</button>
			</div>

			<MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
		</header>
	)
}
