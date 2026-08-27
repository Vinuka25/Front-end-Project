import type { ApiObject } from "@/lib/utils"
import { callApi } from "./apiService.service"

export async function getCategories(signal?: AbortSignal) {
  const apiObject: ApiObject = {
    method: "GET",
    endpoint: "/categories?active_only=1",
    signal,
  }
  return await callApi(apiObject)
}