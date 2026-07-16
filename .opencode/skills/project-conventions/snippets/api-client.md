# API Client Snippets

## REST Client Factory

```tsx
import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios"

type FetchDataProps<Payload = object | undefined> = {
  payload?: Payload
  uri: string
  method?: "post" | "put" | "delete" | "patch" | "get"
}

type FetchStatus = { success: true; error: false; message: string }
  | { success: false; error: true; message: string }

type FetchDataType = <T>(payload: FetchDataProps) => {
  fetch: <Schema>(validator?: Schema) => Promise<void>
  isError(): boolean
  isSuccess(): boolean
  readonly message: string
  readonly error: string
  readonly data: T
  readonly fetchStatus: FetchStatus
  statusCode: number | null
}

function createAxiosInstance(accessToken: () => string | null, serverUri: string): AxiosInstance {
  return axios.create({
    baseURL: serverUri,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  })
}

function createFetchDataClient(
  accessToken: () => string | null,
  serverUri: string,
): FetchDataType {
  const axios = createAxiosInstance(accessToken, serverUri)

  return <T>({ payload, uri, method = "get" }: FetchDataProps) => {
    let fetchStatus: FetchStatus = { success: true, error: false, message: "" }
    let data: T | null = null
    let error: string | null = null
    let statusCode: number | null = null

    return {
      async fetch(validator?) {
        try {
          const config: AxiosRequestConfig = {
            url: uri,
            method,
            data: payload,
            headers: {
              ...(accessToken() ? { Authorization: `Bearer ${accessToken()}` } : {}),
            },
          }

          const response = await axios(config)
          statusCode = response.status
          data = response.data as T
          fetchStatus = { success: true, error: false, message: response.data?.message ?? "Success" }
        } catch (err: unknown) {
          statusCode = axios.isAxiosError(err) ? err.response?.status ?? 500 : 500
          error = fe(err)
          fetchStatus = { success: false, error: true, message: error }
        }
      },
      isError: () => !fetchStatus.success,
      isSuccess: () => fetchStatus.success,
      get message() { return fetchStatus.message },
      get error() { return error ?? "" },
      get data() {
        if (data === null) throw new Error("Data not available")
        return data as T
      },
      get fetchStatus() { return fetchStatus },
      get statusCode() { return statusCode },
    }
  }
}
```

## GraphQL Client Factory

```tsx
type FetchQueryProps = { query: string; variables?: object }

type FetchQueryType = <T>(payload: FetchQueryProps) => {
  fetch: () => Promise<void>
  isError(): boolean
  readonly error: string
  readonly data: T
}

function createFetchQueryClient(
  accessToken: () => string | null,
  serverUri: string,
): FetchQueryType {
  const axiosInstance = createAxiosInstance(accessToken, serverUri)

  return <T>({ query, variables }: FetchQueryProps) => {
    let data: T | null = null
    let error: string | null = null

    return {
      async fetch() {
        try {
          const response = await axiosInstance.post("/query", {
            query,
            variables,
          })
          data = response.data.data as T
          if (response.data.errors) {
            error = fe(response.data.errors[0])
          }
        } catch (err) {
          error = fe(err)
        }
      },
      isError: () => error !== null,
      get error() { return error ?? "" },
      get data() {
        if (data === null) throw new Error("Data not available")
        return data as T
      },
    }
  }
}
```

## Hook Integration

```tsx
import { useMemo } from "react"
import { createFetchDataClient } from "@/libs/fetchData"
import { createFetchQueryClient } from "@/libs/fetchData"
import type { FetchDataType, FetchQueryType } from "@/libs/fetchData"

function useApiClient(): { dataFetch: FetchDataType; queryFetch: FetchQueryType } {
  const getAccessToken = () => null // Replace with your auth store
  const serverUri = config.publicUrls.serverUri

  return useMemo(
    () => ({
      dataFetch: createFetchDataClient(getAccessToken, serverUri),
      queryFetch: createFetchQueryClient(getAccessToken, serverUri),
    }),
    [serverUri],
  )
}
```
