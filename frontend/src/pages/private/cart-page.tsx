import {Link, useNavigate} from "react-router-dom"
import { Minus, Plus, Trash2 } from "lucide-react"
import FeaturedProducts from "@/pages/public/featured-product.tsx";
import {Button} from "@/components/ui/button.tsx";
import {mockProducts} from "@/models/constant/products.ts";
import {useState} from "react";

export default function CartPage() {

  const [cartItems, setCartItems] = useState(mockProducts.slice(0,2));
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((total, item) => total + item.productVariants[0].price * item.productVariants[0].stock, 0)

  const updateQuantity = (itemId: string, variantId: string, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? {
            ...item,
            productVariants: item.productVariants.map((variant) =>
              variant.id === variantId
                ? { ...variant, stock: quantity }
                : variant
            ),
          }
          : item
      )
    );
  };
  const removeFromCart = (itemId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  }
  const removeAllFromCart = () => {
    setCartItems([]);
  }



  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="mb-4 text-2xl font-bold">Your cart is empty</h1>
        <p className="mb-8 text-muted-foreground">Start shopping to add items to your cart.</p>
        <Button asChild>
          <Link to="/">Continue Shopping</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Shopping Cart</h1>
        <p className="text-muted-foreground">
          You have {cartItems.length} item{cartItems.length !== 1 ? "s" : ""} in your cart
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={`${item.id}-${item.productVariants[0].color}-${item.productVariants[0].size}`} className="flex gap-4 rounded-lg border p-4">
                <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                  <img src={item.productVariants[0].variantImage || "/placeholder.svg"} alt={item.name} className="h-full w-full object-cover" />
                </div>
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    {item.productVariants[0].color && (
                      <p className="text-sm text-muted-foreground">
                        Color: {item.productVariants[0].color}
                        {/*<span style={{ color: item.color }}>●</span>*/}
                      </p>
                    )}
                    {item.productVariants[0].size && <p className="text-sm text-muted-foreground">Size: {item.productVariants[0].size}</p>}
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.productVariants[0].id ,item.productVariants[0].stock - 1)}
                        disabled={item.productVariants[0].stock <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm">{item.productVariants[0].stock}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id,item.productVariants[0].id, item.productVariants[0].stock + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-medium">${(item.productVariants[0].stock * item.productVariants[0].price).toFixed(2)}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button
            variant="outline"
            className="mt-4"
            onClick={removeAllFromCart}
          >
            Remove All
          </Button>
        </div>

        {/* Order Summary */}
        <div className="rounded-lg h-fit border p-6">
          <h2 className="mb-4 text-lg font-medium">Order Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Tax</span>
              <span>Calculated at checkout</span>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between text-lg font-medium">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
          </div>
          <Button onClick={() => navigate('/checkout')} className="mt-6 w-full">Go to Checkout Page</Button>
        </div>
      </div>

      {/* Recommended Products */}
      <section className="mt-16">
        <h2 className="mb-8 text-2xl font-bold">You might also like</h2>
        <FeaturedProducts/>
      </section>
    </div>
  )
}
