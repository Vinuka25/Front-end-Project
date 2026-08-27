import { apiClient } from "@/lib/axios";
import type { ApiObject } from "@/lib/utils";
import axios from "axios";


export const callApi = async (apiObject: ApiObject) => {
    try {
        const response = await apiClient({
            method: apiObject.method.toLowerCase(),
            url: apiObject.endpoint,
            data: apiObject.body,
            params: apiObject.params,
            signal: apiObject.signal, 
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