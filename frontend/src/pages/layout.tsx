import { Outlet } from "react-router-dom";
import FooterSection from "@/components/footer.tsx";
import Navbar from "@/components/navigation/navbar.tsx";

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
