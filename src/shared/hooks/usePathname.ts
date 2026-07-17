import { useLocation } from "@tanstack/react-router"

export function usePathname(): string {
	const { pathname } = useLocation()
	return pathname
}
