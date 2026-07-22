import { queryOptions } from "@tanstack/react-query"
import { conferenceService } from "./conference.services"

export const conferenceQueryKey = ["conference"] as const

export const conferenceQuery = () =>
  queryOptions({
    queryKey: conferenceQueryKey,
    queryFn: () => conferenceService.findActive(),
  })

export const conferenceDetailQueryKey = (id: string) =>
  ["conference", id] as const

export const conferenceDetailQuery = (id: string) =>
  queryOptions({
    queryKey: conferenceDetailQueryKey(id),
    queryFn: () => conferenceService.findById(id),
  })
