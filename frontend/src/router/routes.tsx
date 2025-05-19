import {createBrowserRouter} from "react-router-dom";
import {HomePage} from "../pages/home-page.tsx";

export const routes = createBrowserRouter(
  [
    {
      path: '/',
      element : <HomePage />
    },
  ]
)