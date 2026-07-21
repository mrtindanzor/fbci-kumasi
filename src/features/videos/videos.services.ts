import type { FetchDataType } from "@/libs/fetchData"
import { apiRoutes } from "@/shared/routes"
import type {
  AbortUploadPayload,
  CompleteUploadPayload,
  CompleteUploadResponse,
  CreateSessionPayload,
  CreateSessionResponse,
  GetPresignedUrlsPayload,
  GetUploadedPartsPayload,
  IVideoService,
  PresignedPart,
  UploadedPart,
} from "./videos.contracts.types"

class VideoService implements IVideoService {
  constructor(private apiClient: FetchDataType) {}

  async createUploadSession(
    payload: CreateSessionPayload,
  ): Promise<CreateSessionResponse> {
    const { path, method } = apiRoutes.videos.createSession
    const client = this.apiClient<CreateSessionResponse>({
      uri: path,
      method,
      payload,
    })
    await client.fetch()
    return client.data
  }

  async getPresignedUrls(
    payload: GetPresignedUrlsPayload,
  ): Promise<PresignedPart[]> {
    const { path, method } = apiRoutes.videos.presignedUrls
    const client = this.apiClient<{ presignedUrls: PresignedPart[] }>({
      uri: path,
      method,
      payload,
    })
    await client.fetch()
    return client.data.presignedUrls
  }

  async completeUpload(
    payload: CompleteUploadPayload,
  ): Promise<CompleteUploadResponse> {
    const { path, method } = apiRoutes.videos.complete
    const client = this.apiClient<CompleteUploadResponse>({
      uri: path,
      method,
      payload,
    })
    await client.fetch()
    return client.data
  }

  async abortUpload(payload: AbortUploadPayload): Promise<void> {
    const { path, method } = apiRoutes.videos.abort
    const client = this.apiClient<{ message: string }>({
      uri: path,
      method,
      payload,
    })
    await client.fetch()
  }

  async getUploadedParts(
    payload: GetUploadedPartsPayload,
  ): Promise<UploadedPart[]> {
    const { path, method } = apiRoutes.videos.uploadedParts
    const client = this.apiClient<{ parts: UploadedPart[] }>({
      uri: path,
      method,
      payload,
    })
    await client.fetch()
    return client.data.parts
  }
}

export function createVideoService(apiClient: FetchDataType): IVideoService {
  return new VideoService(apiClient)
}
