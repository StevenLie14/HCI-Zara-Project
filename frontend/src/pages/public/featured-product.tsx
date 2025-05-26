const products = [
  {
    name: "Satin Slip Dress",
    price: 189.99,
    image: "/product-dress.jpg",
  },
  {
    name: "Sunset Blaze",
    price: 299.99,
    image: "/product-blazer.jpg",
  },
  {
    name: "Interlock T-Shirt",
    price: 180,
    image: "/product-shirt.jpg",
  },
  {
    name: "Minimalist Bag",
    price: 149.99,
    image: "/product-bag.jpg",
  },
  {
    name: "Minimalist Bag",
    price: 149.99,
    image: "/product-bag.jpg",
  },
  {
    name: "Minimalist Bag",
    price: 149.99,
    image: "/product-bag.jpg",
  },
  {
    name: "Minimalist Bag",
    price: 149.99,
    image: "/product-bag.jpg",
  },
  {
    name: "Minimalist Bag",
    price: 149.99,
    image: "/product-bag.jpg",
  },
  {
    name: "Minimalist Bag",
    price: 149.99,
    image: "/product-bag.jpg",
  },
  {
    name: "Minimalist Bag",
    price: 149.99,
    image: "/product-bag.jpg",
  },
  {
    name: "Minimalist Bag",
    price: 149.99,
    image: "/product-bag.jpg",
  },
];

const FeaturedProducts = () => {
  return (
    <section className="py-5 px-15 w-full mx-auto">
      <div className="overflow-x-auto">
        <div className="flex gap-6 snap-x snap-mandatory overflow-x-scroll pb-4 px-1">
          {products.map((item, idx) => (
            <div
              key={idx}
              className="min-w-[300px] max-w-[300px] flex-shrink-0  rounded-xl shadow-md overflow-hidden snap-start"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-sm font-semibold mb-1">{item.name}</h3>
                <p className="text-sm -700 mb-3">${item.price}</p>
                <button className="w-full bg-black text-white text-sm py-2 rounded-full">
                  Add to Cart +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
