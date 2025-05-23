import FooterSection from "@/components/footer";
import Navbar from "@/components/navbar.tsx";
import { useEffect } from "react";
import HeroSection from "./hero-section";
import FeaturesSection from "./features-section";
import FeaturedProducts from "./featured-product";

export const HomePage = () => {
  useEffect(() => {}, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-grow">
        <HeroSection/>
        <FeaturesSection/>
        <FeaturedProducts/>
      </main>

      <FooterSection />
    </div>
  );
};
