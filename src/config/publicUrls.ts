import { getEnv } from "./utils/getEnv"

const appUrl = getEnv({ name: "VITE_APP_URL" })
const serverUri = getEnv({ name: "VITE_SERVER_URI" })

export const publicUrls = {
	appUrl,
	serverUri,
}
