import type { FetchData } from "./fetchData"

export type FetchingStatus = "idle" | "loading" | "success" | "error"
export type ErrorCode = 400 | 401 | 403 | 404 | 500
export type SuccessCode = 200 | 201

export type FetchStatus = {
	success: boolean
	error: boolean
	message: string
}

export type ServerResponse = {
	message: string
	status: ErrorCode | SuccessCode
}

export type FetchDataProps = {
	uri: string
	method?: "post" | "put" | "delete" | "patch" | "get"
	payload?: Record<string, unknown>
}

export type FetchDataType = <T>(props: FetchDataProps) => FetchData<T>
