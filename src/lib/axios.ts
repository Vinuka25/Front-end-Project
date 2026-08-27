import axios from "axios"
import conf from "@/services/apiConfig.service"

export const apiClient = axios.create({
    baseURL: conf.serviceUrl,
    headers: {
        "Content-Type": "application/json",
    },
})