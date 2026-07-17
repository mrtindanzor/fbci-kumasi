import { Link } from "@tanstack/react-router"
import { BRANDING } from "@/shared/constants"
import { CHURCH_INFO } from "@/shared/db"
import { footerSections } from "./constants"
import { ChurchMap } from "./Map"

export function Footer() {
	return (
		<footer className="bg-primary text-white">
			<div className="container-app pt-8 pb-16">
				<ChurchMap />
				<div className="grid grid-cols-1 md:grid-cols-4 pt-10 gap-10">
					<div className="md:col-span-2">
						<div className="flex items-center gap-2 mb-4">
							<img src="/logo.png" alt={BRANDING.name} className="h-8 w-auto" />
							<span className="font-headline text-lg font-semibold">
								{BRANDING.name}
							</span>
						</div>
						<div className="flex gap-3 mt-6">
							<a
								href={CHURCH_INFO.socials.facebook}
								target="_blank"
								rel="noopener noreferrer"
								className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
							>
								<span className="material-symbols-outlined">public</span>
							</a>
							<a
								href={CHURCH_INFO.socials.youtube}
								target="_blank"
								rel="noopener noreferrer"
								className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
							>
								<span className="material-symbols-outlined">video_library</span>
							</a>
							<a
								href={CHURCH_INFO.socials.email}
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
								{CHURCH_INFO.address}
							</li>
							<li className="flex items-center gap-2">
								<span className="material-symbols-outlined text-sm">
									schedule
								</span>
								Service Times: Sun 8am | Wed 6pm
							</li>
							<li className="flex items-center gap-2">
								<span className="material-symbols-outlined text-sm">call</span>
								{CHURCH_INFO.phone}
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
