import {Button} from "@/components/ui/button.tsx";
import {Card} from "@/components/ui/card.tsx";
import {useNavigate} from "react-router-dom";
import {useProduct} from "@/context/product-context.tsx";
import {loadImage} from "@/utils/utils.ts";



const FeaturedProducts = () => {
  const navigate = useNavigate();
  const {products} = useProduct()
  return (
    <section className="py-5 w-full mx-auto">
      <div className="overflow-x-auto">
        <div className="grid grid-cols-1 items-center  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-6">
          {products.map((item, idx) => (
            <Card
              key={idx}
              className="min-w-[250px] max-w-[300px] flex-shrink-0 p-0  rounded-xl shadow-md overflow-hidden snap-start"
            >
              <img
                src={loadImage(item.productVariants[0].variantImage)}
                alt={item.name}
                className="w-full h-64 object-fit "
              />
              <div className="p-4">
                <h3 className="text-sm font-semibold mb-1">{item.name}</h3>
                <p className="text-sm -700 mb-3">${item.productVariants[0].price}</p>
                <Button onClick={() => navigate('/product/'+item.id)} className="w-full text-sm py-2 rounded-full">
                  Add to Cart +
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
