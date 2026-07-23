import { cloudflare } from "@cloudflare/vite-plugin"
import tailwindcss from "@tailwindcss/vite"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import viteReact from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { routes } from "./src/shared/routes"

export default defineConfig({
  server: { port: 3000 },
  resolve: { tsconfigPaths: true },
  plugins: [
    tailwindcss(),
    tanstackStart({
      prerender: {
        enabled: true,
        filter: ({ path }) =>
          [routes.conferences, routes.projects.home].every(
            (route) => !path.startsWith(route),
          ) &&
          [".mp3", ".jpeg", ".jpg", ".png", ".zip", ".pdf"].every(
            (ext) => !path.endsWith(ext),
          ),
      },
    }),
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    viteReact(),
  ],
})
