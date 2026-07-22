import axios from "axios"
import type { FetchDataType, FetchStatus } from "@/libs/fetchData"
import { apiRoutes } from "@/shared/routes"
import { tryCatch } from "@/shared/utils/tryCatch"
import type {
  GetPresignedUrlPayload,
  IFileService,
  PresignedUrl,
} from "./files.contracts.types"

class FileServices implements IFileService {
  constructor(private apiClient: FetchDataType) {}

  async getSignUrls(payload: GetPresignedUrlPayload[], endpoint: string) {
    const client = this.apiClient<{ presigned: PresignedUrl[] }>({
      uri: endpoint,
      payload: { fileTypes: payload },
    })
    await client.fetch()
    return client.data.presigned
  }

  async removeFile(url: string) {
    const { path, method } = apiRoutes.files.remove(url)
    const client = this.apiClient({
      method: method,
      uri: path,
    })
    await client.fetch()
    return client.fetchStatus
  }

  async uploadFile({
    url,
    file,
    onUploadProgress,
  }: {
    url: string
    file: File
    onUploadProgress(totalInPercentage: number): void
  }): Promise<FetchStatus> {
    const uploaded = await tryCatch(
      axios.put(url, file, {
        onUploadProgress({ total, loaded }) {
          if (!onUploadProgress) return
          const fileSize = total ?? file.size

          onUploadProgress(Math.floor((loaded / fileSize) * 100))
        },
      }),
    )

    return !uploaded.success
      ? {
          error: true,
          message:
            uploaded?.error && uploaded.error === "Network Error"
              ? "File upload unsuccessful. Please check your connection and click the retry button."
              : uploaded.error,
          success: false,
        }
      : {
          message: "File uploaded",
          success: true,
          error: false,
        }
  }
}

export function createFileService(apiClient: FetchDataType): IFileService {
  return new FileServices(apiClient)
}
