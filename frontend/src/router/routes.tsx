import {createBrowserRouter} from "react-router-dom";
import CreateProductPage from "@/pages/private/create-product-page.tsx";
import LoginPage from "@/pages/public/login-page.tsx";
import {HomePage} from "@/pages/guest/home-page.tsx";
import RegisterPage from "@/pages/public/register-page.tsx";
import ProtectedRoute from "@/router/protected-route.tsx";
import {Role} from "@/models/enum/role-enum.ts";
import Layout from "@/pages/layout.tsx";
import AuthRoute from "@/router/auth-route.tsx";
import ResetPasswordPage from "@/pages/public/reset-password-page.tsx";

export const routes = createBrowserRouter(
  [
    {
      element: <Layout />,
      children: [
        {
          children: [
            {
              path: '*',
              element: <HomePage />
            },
            {
              path: '/reset-password',
              element: <ResetPasswordPage />
            }
          ]
        },
        {
          element: <ProtectedRoute role={Role.USER} />,
          children: [
            {
              path: '/create-product',
              element : <CreateProductPage />
            }
          ],
        },
        {
          element: <AuthRoute />,
          children: [
            {
              path: '/login',
              element : <LoginPage />
            },
            {
              path: '/register',
              element : <RegisterPage />
            }
          ]
        }


      ]
    },

  ]
)