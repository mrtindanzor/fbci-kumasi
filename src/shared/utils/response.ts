export type FormattedResponse<T> =
	| {
			message: string
			success: true
			error: false
			data?: T
	  }
	| {
			message: string
			success: false
			error: true
	  }

export function responseUtil<T>(
	message: string,
	success: "success" | "error",
	data?: T,
): FormattedResponse<T> {
	if (success === "success")
		return {
			message,
			success: true,
			error: false,
			...(data ? { data } : {}),
		}

	return { message, success: false, error: true }
}
