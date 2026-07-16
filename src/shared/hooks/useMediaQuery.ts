import { useEffect, useState } from "react"

type UseMediaQueryProps = {
	size?: "sm" | "md" | "lg"
	comparison?: "<" | ">"
	customSize?: number
}

const breakpoints = { sm: 640, md: 768, lg: 1024 }

export function useMediaQuery({
	size = "sm",
	comparison = "<",
	customSize,
}: UseMediaQueryProps = {}) {
	const [matches, setMatches] = useState(false)

	useEffect(() => {
		const query =
			comparison === "<"
				? `(max-width: ${customSize || breakpoints[size]}px)`
				: `(min-width: ${customSize || breakpoints[size]}px)`

		const media = window.matchMedia(query)
		const handler = (e: MediaQueryListEvent) => setMatches(e.matches)

		setMatches(media.matches)
		media.addEventListener("change", handler)
		return () => media.removeEventListener("change", handler)
	}, [size, comparison, customSize])

	return matches
}
