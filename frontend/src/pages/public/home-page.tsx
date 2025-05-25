<<<<<<< HEAD:frontend/src/pages/public/home-page.tsx
=======
import FooterSection from "@/components/footer";
import Navbar from "@/components/navbar.tsx";
>>>>>>> 29536c7 (feat: home page):frontend/src/pages/guest/home-page.tsx
import { useEffect } from "react";
import HeroSection from "./hero-section";
import FeaturesSection from "./features-section";
import FeaturedProducts from "./featured-product";

export const HomePage = () => {
  useEffect(() => {}, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
<<<<<<< HEAD:frontend/src/pages/public/home-page.tsx
=======
      <Navbar />

      <main className="flex-grow">
        <HeroSection/>
        <FeaturesSection/>
        <FeaturedProducts/>
      </main>

      <FooterSection />
>>>>>>> 29536c7 (feat: home page):frontend/src/pages/guest/home-page.tsx
    </div>
  );
};
