import { createBrowserRouter } from "react-router-dom";

import Dashboard from "@/pages/Dashboard.page";
import LoginPage from "@/pages/Login.page";
import RegisterPage from "@/pages/Register.page";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Dashboard />
    },
    {
        path: "/products",
        element: <LoginPage />,
    },
    {
        path: "/settings",
        element: <RegisterPage />,
    },
])