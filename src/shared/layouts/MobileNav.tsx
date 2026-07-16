import { Link } from "@tanstack/react-router"
import { AnimatePresence, motion } from "framer-motion"
import { BRANDING } from "@/shared/constants"
import { mobileNavLinks } from "./constants"

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
						className="fixed inset-y-0 right-0 z-50 w-80 max-w-[85vw] bg-surface shadow-xl md:hidden"
					>
						<div className="flex flex-col h-full">
							<div className="flex items-center justify-between p-5 border-b border-outline-variant">
								<div className="flex items-center gap-2">
									<img
										src="/logo.png"
										alt={BRANDING.name}
										className="h-8 w-auto"
									/>
									<span className="font-headline text-lg font-semibold text-primary">
										{BRANDING.name}
									</span>
								</div>
								<button
									type="button"
									onClick={onClose}
									className="material-symbols-outlined text-2xl text-on-surface-variant"
								>
									close
								</button>
							</div>

							<nav className="flex-1 overflow-y-auto p-5">
								{mobileNavLinks.map((link) => (
									<Link
										key={link.href}
										to={link.href as never}
										onClick={onClose}
										className="flex items-center gap-3 py-3 text-on-surface hover:text-primary transition-colors border-b border-outline-variant/50"
									>
										<span className="material-symbols-outlined text-xl">
											{link.icon}
										</span>
										<span className="font-medium">{link.label}</span>
									</Link>
								))}
							</nav>

							<div className="p-5 border-t border-outline-variant">
								<Link
									to="/"
									onClick={onClose}
									className="flex items-center justify-center gap-2 w-full h-11 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors"
								>
									Give Now
								</Link>
							</div>
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	)
}
