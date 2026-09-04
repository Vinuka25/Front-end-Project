import type { ApiObject } from "@/lib/utils"
import { callApi } from "./apiService.service"

export async function getProfile(signal?: AbortSignal) {
  const apiObject: ApiObject = {
    method: "GET",
    endpoint: "/auth/me",
    signal,
    requiresAuth: true,
  }
  return await callApi(apiObject)
}