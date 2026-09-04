import type { LoginRequest, RegisterRequest } from "../types/auth.type"
import { callApi } from "./apiService.service"

export const ACCESS_TOKEN_KEY = "access_token"
export const REFRESH_TOKEN_KEY = "refresh_token"

function saveTokens(auth?: { access_token: string; refresh_token: string }) {
    if (!auth) return
    localStorage.setItem(ACCESS_TOKEN_KEY, auth.access_token)
    localStorage.setItem(REFRESH_TOKEN_KEY, auth.refresh_token)
}

export async function login(credentials: LoginRequest) {
    const response = await callApi({
        method: "POST",
        endpoint: "/auth/login",
        body: credentials,
    })

    saveTokens(response.data?.auth)
    return response
}

export async function register(data: RegisterRequest) {
    const response = await callApi({
        method: "POST",
        endpoint: "/auth/register",
        body: data,
    })

    saveTokens(response.data?.auth)
    return response
}

export function logout() {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
    localStorage.removeItem("user")
}