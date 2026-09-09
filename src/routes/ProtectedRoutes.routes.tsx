import { Navigate, Outlet } from "react-router-dom"
import { ACCESS_TOKEN_KEY } from "@/services/auth.service"

export default function ProtectedRoute() {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY)

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}