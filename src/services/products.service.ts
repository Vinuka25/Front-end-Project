import type { ApiObject } from "@/lib/utils"
import { callApi } from "./apiService.service"

export async function getProducts(params?: Record<string, unknown>, signal?: AbortSignal) {
  const apiObject: ApiObject = {
    method: "GET",
    endpoint: "/products",
    params,
    signal,
  }
  return await callApi(apiObject)
}

export async function getProductById(idOrSlug: string | number, signal?: AbortSignal) {
  const apiObject: ApiObject = {
    method: "GET",
    endpoint: `/products/${idOrSlug}`,
    signal,
  }
  return await callApi(apiObject)
}

export async function createProduct(formData: FormData) {
    const apiObject: ApiObject = {
        method: "POST",
        endpoint: "/products",
        body: formData,
        requiresAuth: true,
    }
    return await callApi(apiObject)
}

export async function updateProduct(id: number, data: Record<string, unknown>) {
    const apiObject: ApiObject = {
        method: "PUT",
        endpoint: `/products/${id}`,
        body: data,
        requiresAuth: true,
    }
    return await callApi(apiObject)
}

export async function deleteProduct(id: number) {
  const apiObject: ApiObject = {
    method: "DELETE",
    endpoint: `/products/${id}`,
    requiresAuth: true,
  }
  return await callApi(apiObject)
}