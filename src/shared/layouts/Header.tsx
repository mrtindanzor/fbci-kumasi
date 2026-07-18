"use client"

import { Button, Link } from "@/shared/ui/primitives/button"
import { Menu } from "lucide-react"
import { useEffect, useState } from "react"
import { routes } from "../routes"
import { Logo } from "../ui/Logo"
import { DesktopNav } from "./Navbar/DesktopNav"
import { MobileNav } from "./Navbar/MobileNav"

export function Header() {
	const [mobileOpen, setMobileOpen] = useState(false)
	useNavhide(mobileOpen)

	return (
		<header className="fixed inset-x-0 top-0 not-lg:bg-primary z-50 py-3 px-4 lg:px-8">
			<div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
				{/* LEFT: Logo + Social Links */}
				<div className="flex flex-col items-center gap-y-0.5 rounded-xl bg-primary py-1 shadow-lg">
					<Logo />
				</div>

				{/* CENTER: Desktop Navigation */}
				<DesktopNav />

				<Link
					className="hidden lg:flex rounded-4xl border py-2 px-4 shadow-lg"
					href={routes.projects.home}
					variant="gold"
					size="none"
				>
					Projects
				</Link>

				{/* MOBILE: Hamburger */}
				<Button
					type="button"
					size="sm"
					variant="none"
					className="lg:hidden! rounded-md bg-primary px-3 py-2.5 shadow-lg text-neutral-300 hover:bg-primary/90"
					onClick={() => setMobileOpen(true)}
				>
					<Menu className="size-6" />
				</Button>
			</div>

			<MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
		</header>
	)
}

function useNavhide(isOpen: boolean) {
	useEffect(() => {
		if (isOpen) {
			document.body.classList.add("overflow-y-hidden")
		} else {
			document.body.classList.remove("overflow-y-hidden")
		}
	}, [isOpen])
}
