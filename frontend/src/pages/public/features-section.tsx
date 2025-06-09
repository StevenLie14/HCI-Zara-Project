import {Card} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";

const categories = [
  {
    title: "Woman",
    description:
      "Elegant pieces for every occasion. Shop the latest trends in women’s fashion.",
    image: "/picture/women-card.png",
  },
  {
    title: "Man",
    description:
      "Refined essentials and statement pieces. Explore our men’s collection.",
    image: "/picture/man-card.png",
  },
  {
    title: "Kids",
    description:
      "Comfortable, playful, and stylish. Find fashion for your little ones.",
    image: "/picture/kid-card.png",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-12 w-full mx-auto px-15">
      <h2 className="text-2xl font-bold text-center mb-8">
        Features Categories
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((cat, idx) => (
          <Card key={idx} className="rounded-xl overflow-hidden gap-0 shadow-md p-0">
            <img
              src={cat.image}
              alt={cat.title}
              className="w-full h-100 object-cover object-top"
            />
            <div className={"p-4"}>
              <h3 className="text-xl font-bold m-2">{cat.title}</h3>
              <p className="text-sm m-2">{cat.description}</p>
              <Button className={"m-2"}>
                <a
                  href={`/category/${cat.title}`}
                  className="text-sm font-medium inline-flex items-center"
                >
                  Shop Now <span className="ml-1">→</span>
                </a>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
