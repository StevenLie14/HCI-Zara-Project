import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Leaf,
  Minus,
  Plus,
  RefreshCw,
  ShoppingCart,
  Truck,
} from "lucide-react";
import React from "react";


function ProductDetailSection() {
  // Product data
  const productData = {
    category: "Women's T-Shirt",
    name: "Interlock T-Shirt",
    description:
      "T-shirt made of soft, opaque and compact, stretchy knit fabric. Featuring a round neck, drop-shoulder elbow-length sleeves and side vents at the hem.",
    price: "$190",
    colors: [
      { name: "Black", value: "#000000", selected: true },
      { name: "Pink", value: "#fab1a0", selected: false },
      { name: "Brown", value: "#b67845", selected: false },
    ],
    features: [
      { icon: <Truck className="h-5 w-5" />, text: "Free Shipping" },
      { icon: <RefreshCw className="h-5 w-5" />, text: "Easy Returns" },
      { icon: <Leaf className="h-5 w-5" />, text: "Eco Materials" },
    ],
  };

  return (
    <div className="px-15 py-10">
      <Card className="w-full rounded-lg overflow-hidden border-2 border-solid border-[#ced4da]">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row p-12 gap-8">
            {/* Product Image */}
            <div className="w-full md:w-1/2">
              <div className="rounded-2xl overflow-hidden bg-gray-50">
                <img
                  src=""
                  alt="Interlock T-Shirt"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="w-full md:w-1/2 flex flex-col gap-6">
              {/* Product Title and Description */}
              <div className="space-y-4">
                <p className="font-semibold text-lg text-gray-400 tracking-[0.45px] font-['Roboto-SemiBold',Helvetica]">
                  {productData.category}
                </p>
                <h1 className="font-bold text-[38.5px] leading-[38.5px] text-gray-900 font-['Roboto-Bold',Helvetica]">
                  {productData.name}
                </h1>
                <p className="text-gray-600 text-[20.6px] leading-[20.6px] font-['Roboto-Regular',Helvetica]">
                  {productData.description}
                </p>
              </div>

              {/* Price */}
              <div className="font-bold text-3xl leading-[30px] text-black font-['Montserrat-Bold',Helvetica]">
                {productData.price}
              </div>

              {/* Color Selection */}
              <div className="flex items-center gap-4">
                <span className="font-semibold text-[20.6px] text-[#22223b] font-['Montserrat-SemiBold',Helvetica]">
                  Color:
                </span>
                <div className="flex gap-3">
                  {productData.colors.map((color, index) => (
                    <button
                      key={index}
                      className={`w-9 h-9 rounded-full ${
                        color.selected ? "border-2 border-black" : ""
                      }`}
                      style={{ backgroundColor: color.value }}
                      aria-label={`Select ${color.name} color`}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="flex items-center gap-4">
                <span className="font-semibold text-[20.6px] text-[#22223b] font-['Montserrat-SemiBold',Helvetica]">
                  Size:
                </span>
                <Select>
                  <SelectTrigger className="w-36 h-12 border-[1.28px] border-black rounded-[5.14px] font-['Montserrat-Regular',Helvetica] text-[20.6px]">
                    <SelectValue placeholder="Size" />
                  </SelectTrigger>
                </Select>
              </div>

              {/* Quantity Selection */}
              <div className="flex items-center gap-4">
                <span className="font-semibold text-[20.6px] text-[#22223b] font-['Montserrat-SemiBold',Helvetica]">
                  Quantity:
                </span>
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    className="w-[51px] h-[51px] rounded-full bg-gray-100 border-0"
                  >
                    <Minus className="h-5 w-5" />
                  </Button>
                  <span className="font-medium text-[28.9px] font-['Montserrat-Medium',Helvetica]">
                    1
                  </span>
                  <Button
                    size="icon"
                    className="w-[51px] h-[51px] rounded-full bg-black text-white"
                  >
                    <Plus className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <Button className="w-[308px] h-[51px] rounded-full bg-[#232323] text-white font-['Poppins-Medium',Helvetica] text-[20.6px]">
                <span>Add to Cart</span>
                <ShoppingCart className="ml-2 h-5 w-5" />
              </Button>

              {/* Product Features */}
              <div className="flex flex-wrap gap-8 mt-4">
                {productData.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    {feature.icon}
                    <span className="font-normal text-[20.6px] text-[#3f3351] font-['Montserrat-Regular',Helvetica]">
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProductDetailSection;
