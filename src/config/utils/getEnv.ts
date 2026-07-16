export function getEnv(key: string, fallback?: string): string {
	if (typeof import.meta !== "undefined" && import.meta.env) {
		const value = import.meta.env[key]
		if (value !== undefined) return value
	}
	if (fallback !== undefined) return fallback
	throw new Error(`Missing environment variable: ${key}`)
}
