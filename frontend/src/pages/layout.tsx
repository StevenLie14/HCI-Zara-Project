import { AuthProvider } from "@/context/auth-context.tsx";
import { ThemeProvider } from "@/context/theme-context.tsx";
import { ToastService } from "@/utils/toast.ts";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.error) {
      ToastService.error(location.state.error);
    }
    if (location.state && location.state.success) {
      ToastService.success(location.state.success);
    }
  }, [location.state]);
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme={"system"} storageKey={"vite-ui-theme"}>
        <Outlet />
      </ThemeProvider>
    </AuthProvider>
  );
};

export default Layout;
