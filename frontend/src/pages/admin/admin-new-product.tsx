import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";

export default function AdminNewProduct(){
  const products = [
    {
      id: 1,
      name: "Oversized Linen Shirt",
      category: "Tops",
      date: "2024-01-15",
      image: "", 
    },
    {
      id: 2,
      name: "High-Waist Jeans",
      category: "Pants",
      date: "2024-01-15",
      image: "", 
    },
    {
      id: 3,
      name: "Floral Midi Dress",
      category: "Dresses",
      date: "2024-01-15",
      image: "",
    },
    {
      id: 4,
      name: "Cropped Blazer",
      category: "Outwear",
      date: "2024-01-15",
      image: "", 
    },
    {
      id: 5,
      name: "Normal Linen Shirt",
      category: "Tops",
      date: "2024-01-15",
      image: "", 
    },
  ];

  return (
    <Card className="w-full h-[450px]  rounded-[4.86px] border-[0.61px] border-solid shadow-[0px_0px_4px_#00000040]">
      <CardContent className="p-5">
        <div className="mb-7">
          <h2 className="text-[19.1px] font-bold [font-family:'Inter-Bold',Helvetica] ">
            New Product
          </h2>
          <p className="text-[14.6px] [font-family:'Inter-Regular',Helvetica] ">
            Newly added products
          </p>
        </div>

        <ScrollArea className="h-[300px] w-full pr-4">
          <div className="space-y-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex items-center p-4 rounded-[7.72px] border-[0.97px] border-solid shadow-[0px_0px_4.42px_#00000040]"
              >
                <img
                  className="w-[46px] h-[46px] object-cover"
                  alt={product.name}
                  src={product.image}
                />
                <div className="ml-4 flex-1">
                  <div className="[font-family:'Inter-Bold',Helvetica] font-bold  text-[13.3px]">
                    {product.name}
                  </div>
                  <div className="[font-family:'Inter-Regular',Helvetica] font-normal text-gray-500 text-[10.7px]">
                    {product.category}
                  </div>
                </div>
                <div className="[font-family:'Inter-Regular',Helvetica] font-normal text-[16.2px] mr-4">
                  {product.date}
                </div>
                <Button
                  variant="outline"
                  className="h-[26px] w-[42px] rounded-[4.39px] border-[1.1px] border-solid border-gray-300 p-0"
                >
                  <span className="[font-family:'Inter-Regular',Helvetica] font-normal text-[12.5px]">
                    Edit
                  </span>
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
