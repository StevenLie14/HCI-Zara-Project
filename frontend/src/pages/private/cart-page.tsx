import { Link } from "react-router-dom"
import { Minus, Plus, Trash2 } from "lucide-react"
import FeaturedProducts from "@/pages/public/featured-product.tsx";
import {Button} from "@/components/ui/button.tsx";

export default function CartPage() {

  const cartItems = [
    {
      id: 1,
      name: "Stylish T-Shirt",
      image: "/picture/kid-card.png",
      price: 29.99,
      quantity: 2,
      color: "#953b3b",
      size: "M",
    },
    {
      id: 2,
      name: "Stylish T-Shirt",
      image: "/picture/kid-card.png",
      price: 29.99,
      quantity: 2,
      color: "#953b3b",
      size: "M",
    },
    {
      id: 2,
      name: "Stylish T-Shirt",
      image: "/picture/kid-card.png",
      price: 29.99,
      quantity: 2,
      color: "#953b3b",
      size: "M",
    },
    {
      id: 2,
      name: "Stylish T-Shirt",
      image: "/picture/kid-card.png",
      price: 29.99,
      quantity: 2,
      color: "#953b3b",
      size: "M",
    }
  ]
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
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
              <div key={`${item.id}-${item.color}-${item.size}`} className="flex gap-4 rounded-lg border p-4">
                <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                  <img src={item.image || "/placeholder.svg"} alt={item.name} className="h-full w-full object-cover" />
                </div>
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    {item.color && (
                      <p className="text-sm text-muted-foreground">
                        Color: {item.color}
                        {/*<span style={{ color: item.color }}>●</span>*/}
                      </p>
                    )}
                    {item.size && <p className="text-sm text-muted-foreground">Size: {item.size}</p>}
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        // onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        // onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        // onClick={() => removeFromCart(item.id)}
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
            // onClick={() => cartItems.forEach((item) => removeFromCart(item.id))}
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
          <Button className="mt-6 w-full">Go to Checkout Page</Button>
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
