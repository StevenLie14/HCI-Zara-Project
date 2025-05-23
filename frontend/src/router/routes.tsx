import { Role } from "@/models/enum/role-enum.ts";
import { HomePage } from "@/pages/guest/home-page.tsx";
import Layout from "@/pages/layout.tsx";
import CreateProductPage from "@/pages/private/create-product-page.tsx";
import LoginPage from "@/pages/public/login-page.tsx";
import RegisterPage from "@/pages/public/register-page.tsx";
import ResetPasswordPage from "@/pages/public/reset-password-page.tsx";
import AuthRoute from "@/router/auth-route.tsx";
import ProtectedRoute from "@/router/protected-route.tsx";
import { createBrowserRouter } from "react-router-dom";
import ProfilePage from "@/pages/private/profile-page.tsx";

export const routes = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        children: [
          {
            path: "*",
            element: <HomePage />,
          },
          {
            path: "/reset-password",
            element: <ResetPasswordPage />,
          },
        ],
      },
      {
        element: <ProtectedRoute role={Role.USER} />,
        children: [
          {
            path: "/create-product",
            element: <CreateProductPage />,
          },
          {
            path: "/profile",
            element: <ProfilePage />,
          }
        ],
      },
      {
        element: <AuthRoute />,
        children: [
          {
            path: "/login",
            element: <LoginPage />,
          },
          {
            path: "/register",
            element: <RegisterPage />,
          },
        ],
      },
    ],
  },
]);
