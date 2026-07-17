import tailwindcss from "@tailwindcss/vite"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import viteReact from "@vitejs/plugin-react"
import { defineConfig } from "vite"

import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
	server: {
		port: 3000,
	},
	resolve: {
		alias: {
			"@": "/src",
		},
	},
	plugins: [tailwindcss(), tanstackStart(), viteReact(), cloudflare({
        viteEnvironment: {
            name: "ssr"
        }
    })],
})