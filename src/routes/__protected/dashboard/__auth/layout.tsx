import { createFileRoute, Outlet } from "@tanstack/react-router"

export const Route = createFileRoute("/__protected/dashboard/__auth/layout")({
	component: () => <Outlet />,
})
