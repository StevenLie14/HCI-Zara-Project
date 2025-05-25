import {AuthProvider} from "@/context/auth-context.tsx";
import {ThemeProvider} from "@/context/theme-context.tsx";
import {LayoutProvider} from "@/context/layout-context.tsx";
import {Outlet, useLocation} from "react-router-dom";
import {useEffect} from "react";
import {ToastService} from "@/utils/toast.ts";

const ContextProvider = () => {
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
        <LayoutProvider>
          <Outlet />
        </LayoutProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default ContextProvider;