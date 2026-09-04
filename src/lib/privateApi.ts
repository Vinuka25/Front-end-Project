import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios"
import conf from "@/services/apiConfig.service"
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/services/auth.service"

interface RetryConfig extends InternalAxiosRequestConfig {
  _retry?: boolean
}

export const privateApiClient = axios.create({
  baseURL: conf.serviceUrl,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
})

privateApiClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY)
  if (accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

let isRefreshing = false
let failedQueue: { resolve: (token: string) => void; reject: (err: unknown) => void }[] = []

const processQueue = (error: unknown, newToken: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error)
    else resolve(newToken as string)
  })
  failedQueue = []
}

privateApiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryConfig

    if (!originalRequest || error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error)
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject })
      }).then((newToken) => {
        originalRequest.headers.Authorization = `Bearer ${newToken}`
        return privateApiClient(originalRequest)
      })
    }

    originalRequest._retry = true
    isRefreshing = true

    try {
      const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY)
      if (!refreshToken) throw new Error("No refresh token available")

      const { data } = await axios.post(`${conf.serviceUrl}/auth/refresh`, {
        refresh_token: refreshToken,
      })

      const newAccessToken = data.data.auth.access_token
      const newRefreshToken = data.data.auth.refresh_token

      localStorage.setItem(ACCESS_TOKEN_KEY, newAccessToken)
      localStorage.setItem(REFRESH_TOKEN_KEY, newRefreshToken)

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
      processQueue(null, newAccessToken)

      return privateApiClient(originalRequest)
    } catch (refreshError) {
      processQueue(refreshError, null)
      localStorage.removeItem(ACCESS_TOKEN_KEY)
      localStorage.removeItem(REFRESH_TOKEN_KEY)
      window.location.href = "/login"
      return Promise.reject(refreshError)
    } finally {
      isRefreshing = false
    }
  }
)