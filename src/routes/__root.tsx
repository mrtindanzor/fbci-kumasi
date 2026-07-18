import {
	createRootRoute,
	HeadContent,
	Outlet,
	Scripts,
} from "@tanstack/react-router"
import type { PropsWithChildren } from "react"
import { BRANDING } from "@/shared/constants"
import { Footer } from "@/shared/layouts/Footer"
import { Header } from "@/shared/layouts/Header"
import { LoadingScreen } from "@/shared/ui/LoadingScreen"
import appCss from "./globals.css?url"

export const Route = createRootRoute({
	component: RootLayout,
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ title: BRANDING.name },
			{ name: "description", content: BRANDING.description },
		],
		links: [
			{ rel: "stylesheet", href: appCss },
			{
				rel: "icon",
				type: "image/png",
				href: `/favicon/favicon-96x96.png`,
				sizes: "96x96",
			},
			{ rel: "icon", type: "image/svg+xml", href: `/favicon/favicon.svg` },
			{ rel: "shortcut icon", href: `/favicon/favicon.ico` },
			{
				rel: "apple-touch-icon",
				sizes: "180x180",
				href: `/favicon/apple-touch-icon.png`,
			},
			{ rel: "manifest", href: `/favicon/site.webmanifest` },
		],
	}),
})

function RootLayout() {
	return (
		<RootDocument>
			<Outlet />
		</RootDocument>
	)
}

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body className="bg-background text-on-surface font-body antialiased">
				<LayoutOne>{children}</LayoutOne>
				<Scripts />
			</body>
		</html>
	)
}

function LayoutOne({ children }: PropsWithChildren) {
	return (
		<>
			<LoadingScreen />
			<Header />
			<div className=""> {children}</div>
			<Footer />
		</>
	)
}
