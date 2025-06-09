import HeroSection from "./hero-section";
import FeaturesSection from "./features-section";
import FeaturedProducts from "./featured-product";

const HomePage = () => {

  return (

      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-6">
            Featured Products
          </h2>
          <FeaturedProducts />
        </div>
      </main>
  );
};

export default HomePage;