import { useQuery } from "@tanstack/react-query"
import { conferenceQuery } from "../conference.queries"

export function useConference() {
  return useQuery(conferenceQuery())
}
