import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query"

type HydrationProviderProps = {
	queries: { queryKey: readonly unknown[]; data: unknown }[]
	children: React.ReactNode
}

export function HydrationProvider({
	queries,
	children,
}: HydrationProviderProps) {
	const qc = new QueryClient()
	queries.forEach(({ queryKey, data }) => {
		if (data) qc.setQueryData(queryKey, data)
	})

	return <HydrationBoundary state={dehydrate(qc)}>{children}</HydrationBoundary>
}
