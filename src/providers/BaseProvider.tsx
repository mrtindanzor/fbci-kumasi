import type { ReactNode } from "react"

export function BaseProvider({ children }: { children: ReactNode }) {
	return <>{children}</>
}
