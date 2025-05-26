import HeroSection from "./hero-section";
import FeaturesSection from "./features-section";
import FeaturedProducts from "./featured-product";

export const HomePage = () => {

  return (

      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <h2 className="text-2xl font-bold text-center mb-6">
          Featured Products
        </h2>
        <FeaturedProducts />
      </main>
  );
};
