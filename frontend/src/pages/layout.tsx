import { Outlet } from "react-router-dom";
import Navbar from "@/components/navbar.tsx";
import FooterSection from "@/components/footer.tsx";

const Layout = () => {

  return (
      <div className="min-h-screen">
        <Navbar />
        <Outlet />
        <FooterSection />
      </div>
  );
};

export default Layout;
