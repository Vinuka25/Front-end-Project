import { createBrowserRouter, Navigate } from "react-router-dom";

import Dashboard from "@/pages/Dashboard.page";
import LoginPage from "@/pages/Login.page";
import RegisterPage from "@/pages/Register.page";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/login" replace />
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/dashboard",
        element: <Dashboard />,
    },
    {
        path: "/register",
        element: <RegisterPage />,
    },
])