import { Outlet } from "react-router-dom";
import FooterSection from "@/components/footer.tsx";
import Navbar from "@/components/navigation/navbar.tsx";
import {ProductProvider} from "@/context/product-context.tsx";

const Layout = () => {

  return (
    <ProductProvider>
      <div className="min-h-screen">
        <Navbar />
        <Outlet />
        <FooterSection />
      </div>
    </ProductProvider>
  );
};

export default Layout;
