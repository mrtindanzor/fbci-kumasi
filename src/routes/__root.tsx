import {
	createRootRoute,
	HeadContent,
	Outlet,
	Scripts,
} from "@tanstack/react-router"
import { BRANDING } from "@/shared/constants"
import { Footer } from "@/shared/layouts/Footer"
import { Header } from "@/shared/layouts/Header"
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
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:wght@400;500;600;700&display=swap",
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined",
			},
			{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
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
				<Header />
				{children}
				<Footer />
				<Scripts />
			</body>
		</html>
	)
}
