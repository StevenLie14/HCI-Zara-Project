import LoadingScreen from "@/components/loading-screen.tsx";
import { useAuth } from "@/context/auth-context";
import { Role } from "@/models/enum/role-enum.ts";
import { Navigate, Outlet } from "react-router-dom";

interface IProps {
  role?: Role;
}

const ProtectedRoute = ({ role }: IProps) => {
  const { isAuthenticated, me } = useAuth();

  if (isAuthenticated === null) {
    return <LoadingScreen text="Navigating you" />;
  }

  if (!isAuthenticated || !me) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ error: "You need to login first." }}
      />
    );
  }

  if (role && me.role !== role) {
    return (
      <Navigate
        to="/"
        replace
        state={{ error: "You are not authorized to access this page." }}
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
