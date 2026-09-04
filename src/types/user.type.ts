export interface User {
  id: number
  name: string
  email: string
  role: "admin" | "user"
  avatar: string | null
  avatar_url: string | null
  phone: string | null
  address: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

