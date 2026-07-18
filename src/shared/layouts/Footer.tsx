import { BRANDING } from "@/shared/constants"
import { CHURCH_INFO } from "@/shared/db"
import { Logo } from "../ui/Logo"
import { Link } from "../ui/primitives/button"
import { SocialMediaLinks } from "../ui/SocialMediaLinks"
import {
  footerGivingLinks,
  footerQuickLinks,
  footerResourceLinks,
} from "./constants"

function FooterSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div>
      <h4 className="font-headline font-semibold uppercase tracking-wider text-white mb-2">
        {title}
      </h4>
      <div className="w-8 h-0.5 bg-secondary rounded-full mb-5" />
      {children}
    </div>
  )
}

export function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="container-app pt-16 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          <div>
            <Logo />
            <p className="text-sm text-white/60 mt-3 mb-6 leading-relaxed">
              {BRANDING.tagline}
            </p>
            <ul className="space-y-3 text-sm text-white/60">
              <li className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-sm mt-0.5">
                  location_on
                </span>
                <span>{CHURCH_INFO.address.gpa}</span>
              </li>
              {CHURCH_INFO.serviceTimes.map((st) => (
                <li key={st.day} className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-sm mt-0.5">
                    schedule
                  </span>
                  <span>
                    {st.day}: {st.time}
                  </span>
                </li>
              ))}
              <li className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-sm mt-0.5">
                  call
                </span>
                <Link
                  variant="none"
                  size="none"
                  href={`tel:${CHURCH_INFO.phone}`}
                  className="hover:text-white transition-colors duration-200"
                >
                  {CHURCH_INFO.phone}
                </Link>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-sm mt-0.5">
                  mail
                </span>
                <Link
                  variant="none"
                  size="none"
                  href={`mailto:${CHURCH_INFO.socials.email}`}
                  className="hover:text-white transition-colors duration-200"
                >
                  {CHURCH_INFO.socials.email}
                </Link>
              </li>
            </ul>
          </div>

          <FooterSection title="Quick Links">
            <ul className="space-y-2.5">
              {footerQuickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    variant="none"
                    size="none"
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterSection>

          <FooterSection title="Resources">
            <ul className="space-y-2.5">
              {footerResourceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    variant="none"
                    size="none"
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterSection>

          <FooterSection title="Giving">
            <p className="text-sm text-white/50 mb-4 leading-relaxed">
              Support the ministry and help us spread the Gospel worldwide.
            </p>
            <ul className="space-y-2.5">
              {footerGivingLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    variant="none"
                    size="none"
                    to={link.href as never}
                    className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterSection>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <h4 className="font-headline font-semibold text-sm uppercase tracking-wider text-white shrink-0">
            Connect With Us
          </h4>
          <SocialMediaLinks />
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 text-center text-xs text-white/40">
          <p>
            &copy; {new Date().getFullYear()} {BRANDING.name}. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
