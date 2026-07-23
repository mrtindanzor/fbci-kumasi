import type { FetchStatus } from "@/libs/fetchData"

export type ContactType = {
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
}

export abstract class IContactService {
  abstract create(props: ContactType): Promise<FetchStatus>
}
