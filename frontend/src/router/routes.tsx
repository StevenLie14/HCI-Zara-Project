import { Role } from "@/models/enum/role-enum.ts";
import HomePage from "@/pages/public/home-page.tsx";
import Layout from "@/pages/layout.tsx";
import CreateProductPage from "@/pages/admin/create-product-page.tsx";
import LoginPage from "@/pages/auth/login-page.tsx";
import RegisterPage from "@/pages/auth/register-page.tsx";
import ResetPasswordPage from "@/pages/auth/reset-password-page.tsx";
import AuthRoute from "@/router/auth-route.tsx";
import ProtectedRoute from "@/router/protected-route.tsx";
import { createBrowserRouter } from "react-router-dom";
import ProfilePage from "@/pages/private/profile-page.tsx";
import AuthLayout from "@/pages/auth-layout.tsx";
import ContextProvider from "@/pages/context-provider.tsx";
import AdminLayout from "@/pages/admin-layout.tsx";
import DashboardPage from "@/pages/admin/dashboard-page.tsx";
import ProductPage from "@/pages/admin/product-page.tsx";
import ProductDetail from "@/pages/product/product-category";
import ProductDetailPage from "@/pages/public/product-detail.tsx";
import CartPage from "@/pages/private/cart-page.tsx";
import CheckoutPage from "@/pages/private/check-out.tsx";
import {OrderHistoryPage} from "@/pages/order/order-history-page.tsx";


export const routes = createBrowserRouter([
  {
    element: <ContextProvider />,
    children: [
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
                path: "/category/woman",
                element: <ProductDetail />,
              },
              {
                path: "/cartTest",
                element: <CartPage />,
              },
              {
                path: "/product/:id",
                element: <ProductDetailPage />,
              },
            ],
          },
          {
            element: <ProtectedRoute />,
            children: [
              {
                path: "/profile",
                element: <ProfilePage />,
              },
              {
                path: "/cart",
                element: <CartPage />,
              },
              {
                path: "/checkout",
                element: <CheckoutPage />,
              },
              {
                path: "/orders",
                element: <OrderHistoryPage />
              }
            ],
          },
        ],
      },
      {
        element: <AdminLayout />,
        path: "/admin",
        children: [
          {
            element: <ProtectedRoute role={Role.ADMIN} />,
            children: [
              {
                path: "/admin/create-product",
                element: <CreateProductPage />,
              },
              {
                path: "/admin/dashboard",
                element: <DashboardPage />,
              },
              {
                path: "/admin/products",
                element: <ProductPage />,
              },
            ],
          },
        ],
      },
      {
        element: <AuthLayout />,
        children: [
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
              {
                path: "/reset-password",
                element: <ResetPasswordPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
