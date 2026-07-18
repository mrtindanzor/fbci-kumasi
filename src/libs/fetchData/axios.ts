import axios from "axios"
import { publicUrls } from "@/config/publicUrls"

type AxiosInstanceProps = {
  accessToken: string | null
}

export function axiosInstance({ accessToken }: AxiosInstanceProps) {
  return axios.create({
    baseURL: publicUrls.serverUri,
    proxy: false,
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
