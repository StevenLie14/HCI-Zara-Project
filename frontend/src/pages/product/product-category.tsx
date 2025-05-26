import Navbar from "@/components/navbar";
import { Sidebar } from "lucide-react";
import React from "react";
import MainContentSection from "./main-content";
import FooterSection from "@/components/footer";
import SidebarSection from "./side-bar";

function ProductDetail() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* <Navbar /> */}
      <div className="flex flex-1">
        <SidebarSection />
        <MainContentSection />
      </div>
      <FooterSection />
    </div>
  );
}

export default ProductDetail;
