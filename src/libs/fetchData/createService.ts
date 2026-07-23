import { createFetchDataClient } from "./fetchData"
import type { FetchDataType } from "./fetchData.types"

type CreateServiceProps<T> = (config: { apiClient: FetchDataType }) => T

export function createService<T>(config: CreateServiceProps<T>) {
  const apiClient = createFetchDataClient(() => null)

  return config({ apiClient })
}
