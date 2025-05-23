import LoadingScreen from "@/components/loading-screen.tsx";
import { useAuth } from "@/context/auth-context";
import { Navigate, Outlet } from "react-router-dom";

const AuthRoute = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === null) {
    return <LoadingScreen text="Navigating you" />;
  }

  if (isAuthenticated) {
    return (
      <Navigate
        to="/"
        replace
        state={{ error: "You are already logged in." }}
      />
    );
  }

  return <Outlet />;
};

export default AuthRoute;
