import { Outlet } from "react-router-dom";
import AuthNavbar from "@/components/navigation/auth-navbar.tsx";

const AuthLayout = () => {

  return (
      <div className="min-h-screen flex flex-col bg-background">
        <AuthNavbar />
        <Outlet />
      </div>
  );
};

export default AuthLayout;
