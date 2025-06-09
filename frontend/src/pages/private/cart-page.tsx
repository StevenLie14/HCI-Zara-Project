import {Link, useNavigate} from "react-router-dom"
import { Minus, Plus, Trash2 } from "lucide-react"
import FeaturedProducts from "@/pages/public/featured-product.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useCarts} from "@/context/cart-context.tsx";
import {loadImage} from "@/utils/utils.ts";
import {ToastService} from "@/utils/toast.ts";
import type {CartResponse} from "@/models/dto/response/cart-response.ts";
import type {UpdateCartRequest} from "@/models/dto/request/cart/update-cart-request.ts";

export default function CartPage() {

  const {carts, updateCart, deleteCart, deleteAllCarts} = useCarts()
  const navigate = useNavigate();

  const subtotal = carts.reduce((total, item) => total + item.variant.price * item.quantity, 0)

  const updateQuantity = (cart: CartResponse, quantity: number) => {
    if (quantity < 1) {
      ToastService.error("Quantity cannot be less than 1");
      return;
    }
    if (quantity > cart.variant.stock) {
      ToastService.error("Quantity exceeds available stock");
      return;
    }
    const req : UpdateCartRequest = {
      id : cart.id,
      quantity: quantity,
    }
    updateCart.mutate(req)
  }



  if (carts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="mb-4 text-2xl font-bold">Your cart is empty</h1>
        <p className="mb-8 text-muted-foreground">Start shopping to add items to your cart.</p>
        <Button asChild>
          <Link to="/">Continue Shopping</Link>
        </Button>
        <section className="mt-16">
          <h2 className="mb-8 text-2xl font-bold">You might also like</h2>
          <FeaturedProducts/>
        </section>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Shopping Cart</h1>
        <p className="text-muted-foreground">
          You have {carts.length} item{carts.length !== 1 ? "s" : ""} in your cart
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {carts.map((item) => (
              <div key={`${item.id}-${item.variant.color}-${item.variant.size}`} className="flex gap-4 rounded-lg border p-4">
                <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                  <img src={loadImage(item.variant.variantImage) || "/placeholder.svg"} alt={item.product.name} className="h-full w-full object-cover" />
                </div>
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <h3 className="font-medium">{item.product.name}</h3>
                    {item.variant.color && (
                      <p className="text-sm text-muted-foreground">
                        Color: {item.variant.color}
                      </p>
                    )}
                    {item.variant.size && <p className="text-sm text-muted-foreground">Size: {item.variant.size}</p>}
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item, item.quantity - 1)}
                        disabled={item.variant.stock <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item,item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-medium">${(item.quantity * item.variant.price).toFixed(2)}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => deleteCart.mutate(item.id)}
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
            onClick={() => deleteAllCarts.mutate()}
          >
            Remove All
          </Button>
        </div>

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
            {/*<div className="flex justify-between text-sm text-muted-foreground">*/}
            {/*  <span>Tax</span>*/}
            {/*  <span>Calculated at checkout</span>*/}
            {/*</div>*/}
            <hr className="my-4" />
            <div className="flex justify-between text-lg font-medium">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
          </div>
          <Button onClick={() => navigate('/checkout')} className="mt-6 w-full">Go to Checkout Page</Button>
        </div>
      </div>

      <section className="mt-16">
        <h2 className="mb-8 text-2xl font-bold">You might also like</h2>
        <FeaturedProducts/>
      </section>
    </div>
  )
}
