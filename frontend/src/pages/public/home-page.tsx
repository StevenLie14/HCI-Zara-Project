import HeroSection from "./hero-section";
import FeaturesSection from "./features-section";
import FeaturedProducts from "./featured-product";

export const HomePage = () => {

  return (

      <main className="flex-grow">
        <HeroSection/>
        <FeaturesSection/>
        <FeaturedProducts/>
      </main>
  );
};
