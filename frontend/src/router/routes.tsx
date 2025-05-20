import {createBrowserRouter} from "react-router-dom";
import {HomePage} from "../pages/home-page.tsx";
import CreateProductPage from "src/pages/create-product-page.tsx";

export const routes = createBrowserRouter(
  [
    {
      path: '/',
      index: true,
      element : <HomePage />
    },
    {
      path: '/create-product',
      element : <CreateProductPage />
    }
  ]
)