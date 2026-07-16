# Pagination Snippets

## Types

```tsx
// shared/types/pagination.ts
export type PaginateType<T> = {
  nextpage: number | null
  data: T[]
}

export type PropsWithPagination<T extends object = object> = {
  page?: number
  limit?: number
} & T

export type AppInfiniteData<T> = {
  pageParams: number[]
  pages: PaginateType<T>[]
}
```

## useAppInfiniteData Hook

```tsx
import { useInfiniteQuery, type UseInfiniteQueryOptions } from "@tanstack/react-query"
import { useMemo } from "react"
import type { PaginateType, AppInfiniteData } from "@/shared/types"

type UseAppInfiniteDataOptions<Data> = {
  cacheKey: readonly unknown[]
  serviceFn: (props: { page: number; limit?: number }) => Promise<PaginateType<Data>>
  limit?: number
  enabled?: boolean
}

export function useAppInfiniteData<Data>({
  cacheKey,
  serviceFn,
  limit = 20,
  enabled = true,
}: UseAppInfiniteDataOptions<Data>) {
  const result = useInfiniteQuery({
    queryKey: cacheKey,
    queryFn: ({ pageParam = 1 }) => serviceFn({ page: pageParam, limit }),
    getNextPageParam: (lastPage) => lastPage.nextpage ?? undefined,
    initialPageParam: 1,
    enabled,
  })

  const data = useMemo(
    () => result.data?.pages.flatMap((page) => page.data) ?? [],
    [result.data],
  )

  const totalPages = useMemo(
    () => result.data?.pages.length ?? 0,
    [result.data],
  )

  const hasData = result.isFetched && (result.hasNextPage || data.length > 0)
  const hasNoData = !result.isLoading && !result.hasNextPage && data.length === 0

  return {
    ...result,
    data,
    totalPages,
    hasData,
    hasNoData,
  }
}
```

## Paginated Service Pattern

```tsx
// features/<name>/<name>.services.ts
import type { FetchDataType } from "@/libs/fetchData"
import type { PaginateType, FetchStatusWithData } from "@/shared/types"

type EntityListFilters = {
  page?: number
  limit?: number
  search?: string
  sort?: string
}

class EntityListService {
  constructor(private apiClient: FetchDataType) {}

  async list(filters: EntityListFilters): Promise<FetchStatusWithData<PaginateType<EntityType>>> {
    const client = this.apiClient({
      uri: `/api/entities?${new URLSearchParams(filters as Record<string, string>)}`,
      method: "get",
    })
    await client.fetch()
    return client.dataWithStatus as FetchStatusWithData<PaginateType<EntityType>>
  }
}

export function createEntityListService(apiClient: FetchDataType) {
  return new EntityListService(apiClient)
}
```

## Feature Hook with Pagination

```tsx
// features/<name>/hooks/useList.ts
import { useApiClient } from "@/hooks/useApiClient"
import { useAppInfiniteData } from "@/shared/hooks/useAppInfiniteData"
import { createEntityListService } from "../<name>.services"
import { featureKeys } from "../<name>.cache"

export function useEntityList(filters: EntityListFilters) {
  const { dataFetch } = useApiClient()
  const service = useMemo(() => createEntityListService(dataFetch), [dataFetch])

  return useAppInfiniteData({
    cacheKey: [...featureKeys.lists(), filters],
    serviceFn: ({ page }) => service.list({ ...filters, page }),
  })
}
```

## LoadMoreButton Component

```tsx
import { useIntersection } from "@/shared/hooks/useIntersection"
import { Button } from "@/shared/ui/primitives/Button"
import { Spinner } from "@/shared/ui/primitives/Spinner"
import { Visibility } from "@/shared/ui/primitives/Visibility"

type LoadMoreButtonProps = {
  isLoading: boolean
  isFetchingNextPage: boolean
  hasNextPage: boolean
  fetchNextPage: () => void
  hasData?: boolean
}

export function LoadMoreButton({
  isLoading,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
  hasData,
}: LoadMoreButtonProps) {
  const { ref } = useIntersection({ unobserve: true })

  if (isLoading) return <Spinner />
  if (isFetchingNextPage) return <Spinner />

  return (
    <Visibility show={hasNextPage && hasData}>
      <div ref={ref} className="flex justify-center py-4">
        <Button onClick={fetchNextPage} variant="outline">
          Load More
        </Button>
      </div>
    </Visibility>
  )
}
```
