import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/auth-context';
import {Role} from "@/models/enum/role-enum.ts";
import LoadingScreen from "@/components/loading-screen.tsx";

interface IProps {
  role : Role
}

const ProtectedRoute = ({role} : IProps) => {
  const { isAuthenticated, me } = useAuth();

  if (isAuthenticated === null) {
    return <LoadingScreen text='Navigating you' />;
  }

  console.log(isAuthenticated)
  console.log(me)
  if (!isAuthenticated || !me) {
    return <Navigate to="/login" replace state={{ error: 'You need to login first.' }}/>
  }

  if (me.role !== role) {
    return <Navigate to="/" replace state={{ error: 'You are not authorized to access this page.' }}/>
  }

  return <Outlet />
};

export default ProtectedRoute;