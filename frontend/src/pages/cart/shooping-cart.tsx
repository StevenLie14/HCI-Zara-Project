import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Trash2 } from "lucide-react";
import React from "react";

const cartItems = [
  {
    id: 1,
    name: "Levi's Denim Jacket",
    size: "M",
    color: "Blue",
    price: 95,
    quantity: 1,
    image: "/img.png",
  },
  {
    id: 2,
    name: "Minimalist Bag",
    size: "22 x 15 x 8 cm",
    color: "Timberwolf",
    price: 149.99,
    quantity: 1,
    image: "/image.png",
  },
  {
    id: 3,
    name: "Interlock T-Shirt",
    size: "M",
    color: "Ochre",
    price: 190,
    quantity: 2,
    image: "/img-2.png",
  },
];

// Calculate cart totals
const subtotal = cartItems.reduce(
  (sum, item) => sum + item.price * item.quantity,
  0
);
const shipping = "Free";
const total = subtotal;

export default function ShoppingCartSection() {
  return (
    <div className="w-full py-6 px-15">
      <div className="mb-8">
        <h1 className="font-bold text-3xl tracking-tight text-black font-['Montserrat-Bold',Helvetica]">
          Shopping Cart
        </h1>
        <p className="mt-4 text-xl font-['Montserrat-Regular',Helvetica]">
          <span className="text-gray-500">You have</span>
          <span className="font-semibold text-black font-['Montserrat-SemiBold',Helvetica]">
            {" "}
            {cartItems.length} items{" "}
          </span>
          <span className="text-gray-500">in your cart</span>
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Cart Items */}
        <Card className="flex-grow shadow-lg rounded-[22px] bg-add-cart-hovering">
          <CardContent className="p-8">
            <div className="border-b border-gray-100 pb-8">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center py-4 bg-white mb-4"
                >
                  <div className="bg-[#f6f6f6] rounded-[17px] p-3 mr-7">
                    <div
                      className="w-28 h-28 rounded-[11px]"
                      style={{
                        backgroundImage: `url(${item.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                  </div>

                  <div className="flex-grow">
                    <h3 className="text-2xl font-semibold text-gray-800 font-['Montserrat-SemiBold',Helvetica]">
                      {item.name}
                    </h3>
                    <p className="text-gray-500 mt-3 text-lg font-['Montserrat-Regular',Helvetica]">
                      Size: {item.size} • Color: {item.color}
                    </p>
                    <div className="flex items-center mt-4">
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full h-10 w-10 bg-gray-100 border-0"
                      >
                        <span className="font-bold text-2xl">-</span>
                      </Button>
                      <span className="mx-6 text-xl font-medium">
                        {item.quantity}
                      </span>
                      <Button
                        size="icon"
                        className="rounded-full h-10 w-10 bg-black text-white border-0"
                      >
                        <span className="font-bold text-2xl">+</span>
                      </Button>
                    </div>
                  </div>

                  <div className="text-right flex flex-col items-end">
                    <p className="font-bold text-2xl font-['Montserrat-Bold',Helvetica]">
                      ${item.price.toFixed(2)}
                    </p>
                    <Button variant="ghost" size="icon" className="mt-4">
                      <Trash2 className="h-6 w-6" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6">
              <Button
                variant="ghost"
                className="flex items-center gap-2 text-lg font-medium"
              >
                <Trash2 className="h-5 w-5" />
                Remove All
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card className="w-full lg:w-[450px] shadow-lg rounded-[22px] bg-add-cart-hovering">
          <CardContent className="p-10">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-4">
                  <span className="text-xl text-gray-500 font-['Montserrat-Regular',Helvetica]">
                    Subtotal
                  </span>
                  <span className="text-2xl font-bold font-['Montserrat-Bold',Helvetica]">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xl text-gray-500 font-['Montserrat-Regular',Helvetica]">
                    Shipping
                  </span>
                  <span className="text-xl font-semibold text-[#5ac486] font-['Montserrat-SemiBold',Helvetica]">
                    {shipping}
                  </span>
                </div>
              </div>

              <Separator className="bg-gray-100" />

              <div className="flex justify-between pt-4">
                <span className="text-2xl font-bold font-['Montserrat-Bold',Helvetica]">
                  Total
                </span>
                <span className="text-3xl font-extrabold font-['Montserrat-ExtraBold',Helvetica]">
                  ${total.toFixed(2)}
                </span>
              </div>

              <Button className="w-full h-[73px] mt-6 bg-button-login-register rounded-[17px] shadow-md text-2xl font-bold font-['Montserrat-Bold',Helvetica]">
                <CreditCard className="mr-4 h-6 w-7" />
                Checkout Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
