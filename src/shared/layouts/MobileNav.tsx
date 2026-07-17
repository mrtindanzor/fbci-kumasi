import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"
import { routes } from "../routes"
import { Logo } from "../ui/Logo"
import { Button, Link } from "../ui/primitives/button"
import { NAV_LINKS } from "./constants"

type MobileNavProps = {
	open: boolean
	onClose: () => void
}

export function MobileNav({ open, onClose }: MobileNavProps) {
	return (
		<AnimatePresence>
			{open && (
				<>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-50 bg-black/50 md:hidden"
						onClick={onClose}
					/>
					<motion.div
						initial={{ x: "100%" }}
						animate={{ x: 0 }}
						exit={{ x: "100%" }}
						transition={{ type: "spring", damping: 25, stiffness: 200 }}
						className="fixed inset-y-0 border-l border-l-neutral-100 right-0 z-50 w-80 max-w-[85vw] bg-surface shadow-xl md:hidden"
					>
						<div className="flex flex-col h-full">
							<div className="flex items-center bg-primary justify-between py-5 px-2 border-b border-outline-variant">
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
								{NAV_LINKS.map((link) => (
									<Link
										key={link.href}
										href={link.href}
										onClick={onClose}
										variant="none"
										size="none"
										className="flex py-3 text-left  justify-center text-on-surface hover:text-primary transition-colors border-b border-outline-variant/20 font-medium"
									>
										{link.label}
									</Link>
								))}
							</nav>

							<div className="p-5 border-t border-outline-variant">
								<Link
									href={routes.projects.home}
									onClick={onClose}
									className="flex items-center justify-center gap-2 w-full h-11 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors"
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
