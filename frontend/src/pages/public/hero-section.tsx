import React from "react";

const HeroSection = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="../../../assets/picture/Screenshot 2025-05-21 155452.png"
          alt="Hero Background"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
      </div>

      {/* Text & Buttons */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">
          Discover Your Style
        </h1>
        <p className="text-white text-base md:text-lg max-w-xl mb-6">
          Effortlessly chic. Explore our latest arrivals for the season –
          crafted with you in mind.
        </p>
        <div className="flex space-x-4">
          <button className="bg-black text-white px-6 py-2 rounded-full text-sm hover:bg-gray-800 transition">
            Shop Women
          </button>
          <button className="bg-white text-black px-6 py-2 rounded-full text-sm hover:bg-gray-100 transition">
            Shop Men
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
