import FooterSection from "@/components/footer";
import Navbar from "@/components/navbar.tsx";
import { useEffect } from "react";
import ShoppingCartSection from "./shooping-cart";
import FeaturedProducts from "../public/featured-product";

export const CartPage = () => {
  useEffect(() => {}, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* <Navbar /> */}

      <main className="flex-grow">
        <ShoppingCartSection />
        <h2 className="text-2xl font-bold mb-6 px-15 pt-6">
          You might also like
        </h2>
        <FeaturedProducts />
      </main>

      <FooterSection />
    </div>
  );
};
