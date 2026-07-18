import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router"
import { generateMetaData } from "@/libs/tanstack"
import { BaseProvider } from "@/providers/BaseProvider"
import { BRANDING } from "@/shared/constants"
import { LoadingScreen } from "@/shared/ui/LoadingScreen"
import appCss from "./globals.css?url"

export const Route = createRootRoute({
  component: RootLayout,
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      ...generateMetaData({
        title: BRANDING.name,
        description: BRANDING.description,
        path: "",
      }),
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
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="bg-background text-on-surface font-body antialiased">
        <LoadingScreen />
        <BaseProvider>
          <Outlet />
        </BaseProvider>
        <Scripts />
      </body>
    </html>
  )
}
