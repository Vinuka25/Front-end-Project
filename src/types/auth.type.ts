import type { User } from "./user.type"

export interface AuthTokens {
  access_token: string
  token_type: string
  expires_in: number
  expires_at: string
  refresh_token: string
  refresh_expires_at: string
}

export interface AuthResponseData {
  data: any
  refresh_Token: string
  access_Token: string
  refreshToken: string
  accessToken: string
  user: User
  auth: AuthTokens
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
  password_confirmation: string
  phone: string
  address: string
}