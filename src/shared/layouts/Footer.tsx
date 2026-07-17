import { Link } from "@tanstack/react-router"
import { BRANDING } from "@/shared/constants"
import { CHURCH_INFO } from "@/shared/db"
import { Logo } from "../ui/Logo"
import { SocialMediaLinks } from "../ui/SocialMediaLinks"
import { footerSections } from "./constants"
import { ChurchMap } from "./Map"

export function Footer() {
	return (
		<footer className="bg-primary text-white">
			<div className="container-app pt-8 pb-16">
				<ChurchMap />
				<div className="grid grid-cols-1 md:grid-cols-4 pt-10 gap-10">
					<div className="md:col-span-2 flex flex-col items-start gap-y-4">
						<Logo />
						<div className="pl-8">
							<SocialMediaLinks />
						</div>
					</div>

					<div>
						<h4 className="font-headline font-semibold mb-4">Information</h4>
						<ul className="space-y-2 text-sm text-white/70">
							<li className="flex items-center gap-2">
								<span className="material-symbols-outlined text-sm">
									location_on
								</span>
								{CHURCH_INFO.address.gpa}
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
