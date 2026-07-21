import { BRANDING } from "../constants"
import { routes } from "../routes"
import { Link } from "./primitives/button"
import { Image } from "./primitives/Image"

export function Logo() {
  return (
    <Link href={routes.home} variant="none" size="none" className="p-0 w-fit">
      <Image src="/logo.png" alt={BRANDING.name} className="h-12  w-auto" />
      <span className="sr-only">{BRANDING.name}</span>
    </Link>
  )
}
