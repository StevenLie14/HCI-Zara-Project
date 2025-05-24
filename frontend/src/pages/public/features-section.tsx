const categories = [
  {
    title: "Woman",
    description:
      "Elegant pieces for every occasion. Shop the latest trends in women’s fashion.",
    image: "/category-woman.jpg",
  },
  {
    title: "Man",
    description:
      "Refined essentials and statement pieces. Explore our men’s collection.",
    image: "/category-man.jpg",
  },
  {
    title: "Kids",
    description:
      "Comfortable, playful, and stylish. Find fashion for your little ones.",
    image: "/category-kids.jpg",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-8">
        Features Categories
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className="rounded-xl overflow-hidden shadow-md "
          >
            <img
              src={cat.image}
              alt={cat.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{cat.title}</h3>
              <p className="text-sm  mb-4">{cat.description}</p>
              <a
                href="#"
                className="text-sm font-medium inline-flex items-center"
              >
                Shop Now <span className="ml-1">→</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
