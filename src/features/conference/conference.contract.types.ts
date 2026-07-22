import type { FilePayload, Uploads } from "../files"

export type ConferenceResource = {
  id?: string
  title: string
  file: string
  type: string
  size?: string
}

export type Conference = {
  id: string
  shortIntro: string
  title: string
  theme: string
  startDate: string
  endDate: string
  fullDescription: string
  closingMessage: string
  poster: string
  resources: ConferenceResource[]
}

export type ConferenceInput = Omit<Conference, "id">

export type RetrieveSelectedFile = {
  updateState: (file: FilePayload) => void
  getUploads: () => Uploads
}

export abstract class IConferenceService {
  abstract findActive(): Promise<Conference | null>
  abstract findById(id: string): Promise<Conference | null>
  abstract create(data: ConferenceInput): Promise<Conference>
  abstract update(
    id: string,
    data: Partial<ConferenceInput>,
  ): Promise<Conference>
  abstract delete(id: string): Promise<void>
}
