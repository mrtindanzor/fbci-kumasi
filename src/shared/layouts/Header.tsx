"use client"

import { useState } from "react"
import { BRANDING } from "@/shared/constants"
import { Link } from "@/shared/ui/primitives/button"
import { routes } from "../routes"
import { navLinks } from "./constants"
import { MobileNav } from "./MobileNav"

export function Header() {
	const [mobileOpen, setMobileOpen] = useState(false)

	return (
		<header className="sticky bg-background top-0 z-50 glass">
			<div className="container-app flex h-16 items-center justify-between">
				<Link to="/" className="flex items-center">
					<img src="/logo.png" alt={BRANDING.name} className="h-10 w-auto" />
				</Link>

				<nav className="hidden md:flex items-center">
					{navLinks.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							variant="none"
							size="none"
							className="text-sm px-2 py-1 rounded-sm font-medium text-on-surface-variant hover:text-primary transition-colors"
						>
							{link.label}
						</Link>
					))}
				</nav>

				<div className="hidden md:flex items-center gap-3">
					<Link href={routes.projects} variant="primary" size="sm">
						Projects
					</Link>
				</div>

				<button
					type="button"
					className="md:hidden! material-symbols-outlined text-2xl text-primary"
					onClick={() => setMobileOpen(true)}
				>
					menu
				</button>
			</div>

			<MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
		</header>
	)
}
