import { BRANDING } from "../constants"
import { Link } from "./primitives/button"
import { Image } from "./primitives/Image"

export function Logo() {
	return (
		<Link to="/" variant="none" className="flex items-center">
			<Image src="/logo.png" alt={BRANDING.name} className="h-12 w-auto" />
		</Link>
	)
}
