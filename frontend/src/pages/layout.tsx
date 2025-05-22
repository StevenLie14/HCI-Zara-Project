import {Outlet, useLocation} from "react-router-dom";
import {useEffect} from "react";
import {ToastService} from "@/utils/toast.ts";
import {AuthProvider} from "@/context/auth-context.tsx";

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
      <div className="flex flex-col h-screen">
        <main className="flex-grow p-4">
          <Outlet />
        </main>

      </div>
    </AuthProvider>
  );
}

export default Layout