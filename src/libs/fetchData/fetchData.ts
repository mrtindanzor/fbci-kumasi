import { fe } from "@/shared/utils/fe"
import { responseUtil } from "@/shared/utils/response"
import { tryCatch } from "@/shared/utils/tryCatch"
import { axiosInstance } from "./axios"
import type {
  ErrorCode,
  FetchDataProps,
  FetchingStatus,
  ServerResponse,
  SuccessCode,
} from "./fetchData.types"

export class FetchData<T> {
  private status: FetchingStatus = "idle"
  private privateData: T | null = null
  private error = ""
  private message = ""

  statusCode: ErrorCode | SuccessCode = 400

  constructor(
    private localPayload: FetchDataProps,
    private getAccessToken: () => string | null,
  ) {}

  async fetch() {
    if (this.status !== "idle") return

    const { uri, method = "post", payload } = this.localPayload
    this.status = "loading"

    const axios = axiosInstance({ accessToken: this.getAccessToken() })

    let promise: Promise<import("axios").AxiosResponse<ServerResponse & T>>

    switch (method) {
      case "delete":
      case "get": {
        promise = axios[method](uri)
        break
      }
      default:
        promise = axios[method](uri, payload)
    }

    const result = await tryCatch(promise)

    this.status = "error"
    this.statusCode = 400

    if (!result.success) {
      this.error = fe(result.error)
      return
    }

    if (![200, 201].includes(result.data.data.status)) {
      this.error = fe(result.data.data.message)
      return
    }

    const { message: resMessage, status: _s, ...rest } = result.data.data

    this.statusCode = result.data.data.status
    this.status = "success"
    this.message = resMessage

    this.privateData = rest as T
  }

  isError() {
    return this.status === "error"
  }

  isSuccess() {
    return this.status === "success"
  }

  get data() {
    if (!this.privateData)
      throw Error(this.error ?? "Data not available, call fetch first")

    return this.privateData
  }

  get dataWithStatus() {
    if (this.privateData)
      return responseUtil(this.message, "success", this.privateData)

    return responseUtil(this.error, "error")
  }

  get fetchStatus() {
    if (this.status === "success") return responseUtil(this.message, "success")

    return responseUtil(this.error, "error")
  }
}

export function createFetchDataClient(getAccessToken: () => string | null) {
  return <T>(payload: FetchDataProps) =>
    new FetchData<T>(payload, getAccessToken)
}
