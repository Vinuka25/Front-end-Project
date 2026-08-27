import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface ApiObject {
  method: "GET" | "PSOT" | "PUT" | "PATCH" | "DELETE"
  endpoint: string
  body?: unknown
  params?: Record<string, unknown>
  signal?: AbortSignal
}