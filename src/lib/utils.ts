import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface ApiObject {
  isWithoutPrefix?: boolean
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
  endpoint: string
  body?: unknown
  params?: Record<string, unknown>
  signal?: AbortSignal
  requiresAuth?: boolean
  headers?: Record<string, string>
}