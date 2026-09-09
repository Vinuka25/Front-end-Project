import { createBrowserRouter } from "react-router-dom"

import Dashboard from "@/pages/Dashboard.page"
import LoginPage from "@/pages/Login.page"
import RegisterPage from "@/pages/Register.page"
import ProductsPage from "@/pages/Products.page"
import AppLayout from "@/components/Layout/AppLayout.component"
import ProtectedRoute from "./ProtectedRoutes.routes"

export const router = createBrowserRouter([
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: "/",
                element: <AppLayout />,
                children: [
                    { index: true, element: <Dashboard /> },
                    { path: "products", element: <ProductsPage /> },
                ],
            },
        ],
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/register",
        element: <RegisterPage />,
    },
])

