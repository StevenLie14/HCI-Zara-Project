import FooterSection from "@/components/footer";
import { useEffect } from "react";
import OrderHistory from "./order-history";

export const OrderHistoryPage = () => {
  useEffect(() => {}, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* <Navbar /> */}

      <main className="flex-grow">
        <OrderHistory/>
      </main>

      <FooterSection />
    </div>
  );
};
