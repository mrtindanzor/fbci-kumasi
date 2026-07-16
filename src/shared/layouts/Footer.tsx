import { Link } from "@tanstack/react-router"
import { BRANDING } from "@/shared/constants"
import { church } from "@/shared/db"
import { footerSections } from "./constants"

export function Footer() {
	return (
		<footer id="contact" className="bg-primary text-white">
			<div className="container-app py-16">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-10">
					<div className="md:col-span-2">
						<div className="flex items-center gap-2 mb-4">
							<img src="/logo.png" alt={BRANDING.name} className="h-8 w-auto" />
							<span className="font-headline text-lg font-semibold">
								{BRANDING.name}
							</span>
						</div>
						<div className="flex gap-3 mt-6">
							<a
								href={church.socials.facebook}
								target="_blank"
								rel="noopener noreferrer"
								className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
							>
								<span className="material-symbols-outlined">public</span>
							</a>
							<a
								href={church.socials.youtube}
								target="_blank"
								rel="noopener noreferrer"
								className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
							>
								<span className="material-symbols-outlined">video_library</span>
							</a>
							<a
								href={church.socials.email}
								className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
							>
								<span className="material-symbols-outlined">
									alternate_email
								</span>
							</a>
						</div>
					</div>

					<div>
						<h4 className="font-headline font-semibold mb-4">Information</h4>
						<ul className="space-y-2 text-sm text-white/70">
							<li className="flex items-center gap-2">
								<span className="material-symbols-outlined text-sm">
									location_on
								</span>
								{church.address}
							</li>
							<li className="flex items-center gap-2">
								<span className="material-symbols-outlined text-sm">
									schedule
								</span>
								Service Times: Sun 8am | Wed 6pm
							</li>
							<li className="flex items-center gap-2">
								<span className="material-symbols-outlined text-sm">call</span>
								{church.phone}
							</li>
						</ul>
					</div>

					{footerSections.map((section) => (
						<div key={section.title}>
							<h4 className="font-headline font-semibold mb-4">
								{section.title}
							</h4>
							<ul className="space-y-2 text-sm text-white/70">
								{section.links.map((link) => (
									<li key={link.label}>
										<Link
											to={link.href as never}
											className="hover:text-white transition-colors"
										>
											{link.label}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}

					<div>
						<h4 className="font-headline font-semibold mb-4">Newsletter</h4>
						<p className="text-sm text-white/70 mb-4">
							Stay updated with our latest news and events.
						</p>
						<div className="flex gap-2">
							<input
								type="email"
								placeholder="Your email"
								className="flex-1 rounded-lg bg-white/10 border border-white/20 px-3 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-secondary"
							/>
							<button
								type="button"
								className="rounded-lg bg-secondary px-4 py-2 text-sm font-semibold text-white hover:bg-secondary/90 transition-colors"
							>
								Subscribe
							</button>
						</div>
					</div>
				</div>

				<div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-white/50">
					<p>
						&copy; {new Date().getFullYear()} {BRANDING.name}. All rights
						reserved.
					</p>
				</div>
			</div>
		</footer>
	)
}
