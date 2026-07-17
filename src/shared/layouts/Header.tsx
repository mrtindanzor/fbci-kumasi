"use client"

import { Button, Link } from "@/shared/ui/primitives/button"
import { motion } from "framer-motion"
import { Menu } from "lucide-react"
import { useEffect, useState } from "react"
import { routes } from "../routes"
import { AnimatePosition } from "../ui/Framer"
import {
	slideDown,
	slideInLeft,
	slideInRight,
	slideUp,
} from "../ui/Framer/utils/motion"
import { Logo } from "../ui/Logo"
import { SocialMediaLinks } from "../ui/SocialMediaLinks"
import { NAV_LINKS } from "./constants"
import { MobileNav } from "./MobileNav"

export function Header() {
	const [mobileOpen, setMobileOpen] = useState(false)
	useNavhide(mobileOpen)

	return (
		<motion.header
			variants={slideDown}
			initial="hidden"
			whileInView="show"
			className="sticky bg-primary top-0 z-50"
		>
			<div className="container-app flex h-30 items-center justify-between">
				<div className="flex flex-col gap-y-0.5 items-center h-fit">
					<AnimatePosition variants={slideInLeft}>
						<Logo />
					</AnimatePosition>

					<AnimatePosition variants={slideInRight}>
						<SocialMediaLinks />
					</AnimatePosition>
				</div>

				<motion.nav>
					<motion.ul className="hidden md:flex items-center" variants={slideUp}>
						{NAV_LINKS.map((link) => (
							<motion.li key={link.href} variants={slideInLeft}>
								<Link
									href={link.href}
									variant="none"
									size="none"
									className="text-sm px-2 py-1 rounded-sm font-medium text-neutral-300 hover:text-primary hover:bg-surface transition-colors"
								>
									{link.label}
								</Link>
							</motion.li>
						))}
					</motion.ul>
				</motion.nav>

				<AnimatePosition variants={slideInRight} className="hidden md:flex">
					<Link href={routes.projects.home} variant="gold" size="sm">
						Projects
					</Link>
				</AnimatePosition>

				<Button
					type="button"
					size="sm"
					variant="none"
					className="md:hidden! *:*:size-40 text-neutral-300 hover:bg-transparent p-0 px-2 rounded-xs"
					onClick={() => setMobileOpen(true)}
				>
					<Menu className="size-8" />
				</Button>
			</div>

			<MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
		</motion.header>
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
