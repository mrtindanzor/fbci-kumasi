# Route Definition Snippets

## Standard Page Route

```tsx
import { createFileRoute } from "@tanstack/react-router"
import { generateMetaData } from "@/libs/tanstack"
import { PageName } from "@/screens/<name>"
import { opengraphs } from "@/shared/routes"

export const Route = createFileRoute("/path")({
  component: PageName,
  head: () => ({
    meta: generateMetaData({
      title: "Page Title",
      description: "Page description for SEO and social sharing.",
      path: "path",
      images: opengraphs.select("path"),
    }),
  }),
})
```

## Root Route

```tsx
import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router"
import { AppLayout } from "@/Layout"
import { generateMetaData } from "@/libs/tanstack"
import { DataProviders } from "@/providers/BaseProvider"
import { NotFoundPage } from "@/shared/ui/NotFoundPage"
import { branding } from "@/shared/constants"
import { opengraphs } from "@/shared/routes"
import appCss from "./globals.css?url"

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFoundPage,
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      ...generateMetaData({
        title: "<AppName>",
        description: "<AppDescription>",
        path: "",
        images: opengraphs.select("home"),
      }),
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/svg+xml", href: "/favicon/favicon.svg" },
      { rel: "apple-touch-icon", href: "/favicon/apple-touch-icon.png" },
    ],
  }),
})

function RootLayout() {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="bg-muted text-neutral">
        <DataProviders>
          <AppLayout>
            <Outlet />
          </AppLayout>
        </DataProviders>
        <Scripts />
      </body>
    </html>
  )
}
```

## Route Constants

```tsx
// shared/routes/routes.ts
export const routes = Object.freeze({
  home: "/",
  page1: "/page1",
  page2: "/page2",
  page3: "/page3",
})
export type Routes = (typeof routes)[keyof typeof routes]

// shared/routes/apiRoutes.ts
export const apiRoutes = Object.freeze({
  resource: {
    list: { path: "/api/resources", method: "get" },
    create: { path: "/api/resources", method: "post" },
    detail: { path: "/api/resources", method: "get" },
    update: { path: "/api/resources", method: "put" },
    delete: { path: "/api/resources", method: "delete" },
  },
} as const)

// shared/routes/opengraph.ts
const graphs = Object.freeze({
  home: "/home.png",
  page1: "/page1.png",
  page2: "/page2.png",
})

type Opengraphs = typeof graphs

export const opengraphs = {
  select: <T extends keyof Opengraphs>(graph: T) =>
    `/images/opengraphs${graphs[graph]}` as const,
} as const

// shared/routes/index.ts
export * from "./opengraph"
export * from "./routes"
```
