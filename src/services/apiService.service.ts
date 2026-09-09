import type { ApiObject } from "@/lib/utils"
import axios from "axios"
import { publicApiClient } from "@/lib/publicApi"
import { privateApiClient } from "@/lib/privateApi"

export const callApi = async (apiObject: ApiObject) => {
    const { method, endpoint, body, params, signal, headers, requiresAuth = false } = apiObject

    try {
        const instance = requiresAuth ? privateApiClient : publicApiClient

        const isFormData = typeof FormData !== "undefined" && body instanceof FormData
        const finalHeaders: Record<string, string | undefined> = { ...headers }
        if (isFormData) {
            finalHeaders["Content-Type"] = undefined
        }

        const response = await instance({
            method,
            url: endpoint,
            data: body,
            params,
            signal,
            headers: finalHeaders,
        })

        return response.data
    } catch (error: unknown) {
        if (axios.isCancel(error)) throw error

        if (axios.isAxiosError(error)) {
            throw {
                success: false,
                status: error.response?.status || 500,
                message: error.response?.data?.message || "Failed to fetch data",
            }
        }

        throw { success: false, status: 500, message: "Unexpected error" }
    }
}