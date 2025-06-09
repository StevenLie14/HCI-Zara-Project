import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom"
import { Plus, Edit, Check } from "lucide-react"
import {z} from "zod";
import {ToastService} from "@/utils/toast.ts";
import {Button} from "@/components/ui/button.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {
  Dialog,
  DialogContent,
  DialogDescription, DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import useAddress from "@/hooks/use-address.ts";
import AddressDialog from "@/components/profile/address-dialog.tsx";
import {paymentMethods} from "@/models/constant/payment-method.ts";
import {mockProducts} from "@/models/constant/products.ts";

export const checkoutSchema = z.object({
  shippingAddressId: z.string().min(1, { message: "Please select a shipping address" }),
  paymentMethod: z.string().min(1, { message: "Please select a payment method" }),
  items: z.array(
    z.object({
      id: z.string(),
      product_id: z.string(),
      variant_id: z.string(),
      price: z.number().min(0, { message: "Price must be a positive number" }),
      quantity: z.number().min(1, { message: "Quantity must be at least 1" }),
    })
  ).nonempty({ message: "Your cart is empty" }),
})

export type CheckoutFormValues = z.infer<typeof checkoutSchema>



export default function CheckoutPage() {

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
  const { editingAddress, handleAddAddress, handleEditAddress, showAddressDialog, setShowAddressDialog, addresses, getAddresses } = useAddress()
  const [orderNumber, setOrderNumber] = useState("")

  const navigate = useNavigate()

  const shipping = 0 // Free shipping
  const taxRate = 0 // 10% tax


  const cartItems = mockProducts.slice(0,2)
  const subtotal = cartItems.reduce((total, item) => total + item.productVariants[0].price * item.productVariants[0].stock, 0)
  const tax = subtotal * taxRate
  const total = subtotal + shipping + tax

  // Main checkout form
  const checkoutForm = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      shippingAddressId: addresses[0]?.id || undefined,
      paymentMethod: paymentMethods[0].id,
    },
  })

  const onCheckoutSubmit = (values: CheckoutFormValues) => {
    if (cartItems.length === 0) {
      ToastService.error("Your cart is empty", "Please add items to your cart before proceeding to checkout.")
      return
    }

    setOrderNumber(`ZR-${Math.floor(100000 + Math.random() * 900000)}`)
    setIsConfirmationOpen(true)
  }


  const handleOrderConfirmation = () => {
    setIsConfirmationOpen(false)
    navigate("/")
    // toast({
    //   title: "Order placed successfully!",
    //   description: `Your order ${orderNumber} has been confirmed.`,
    // })
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="mb-4 text-2xl font-bold">Your cart is empty</h1>
        <p className="mb-8 text-muted-foreground">Start shopping to add items to your cart.</p>
        <Button onClick={() => navigate("/")}>Continue Shopping</Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Checkout</h1>
        <p className="text-muted-foreground">
          You have {cartItems.length} item{cartItems.length !== 1 ? "s" : ""} in your cart
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Main Content */}
        <div>
          <Form {...checkoutForm}>
            <form onSubmit={checkoutForm.handleSubmit(onCheckoutSubmit)} className="space-y-8">
              {/* Cart Items */}
              <div className="rounded-lg border p-6">
                <h2 className="mb-4 text-lg font-medium">Your Items</h2>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={`${item.id}-${item.productVariants[0].color}-${item.productVariants[0].size}`} className="flex gap-4">
                      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                        <img
                          src={item.productVariants[0].variantImage || "/placeholder.svg"}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex flex-1 justify-between">
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <div className="flex gap-2 text-sm text-muted-foreground">
                            {item.productVariants[0].color && (
                              <div>
                                Color: {item.productVariants[0].color}
                              </div>
                            )}
                            {item.productVariants[0].size && <div>Size: {item.productVariants[0].size}</div>}
                          </div>
                          <span className={"text-sm text-muted-foreground"}>Qty: {item.productVariants[0].stock}</span>
                        </div>
                        <div className="font-medium">${(item.productVariants[0].price * item.productVariants[0].stock).toFixed(2)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-medium">Shipping Addresses</h2>
                  <Button variant={"outline"} type={"button"} onClick={handleAddAddress} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Address
                  </Button>
                </div>

                <FormField
                  control={checkoutForm.control}
                  name="shippingAddressId"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Choose Shipping Address</FormLabel>
                      <FormControl>
                        <RadioGroup value={field.value} onValueChange={field.onChange} className="space-y-3">
                          {addresses.map((address) => (
                            <div key={address.id} className="flex items-center space-x-3 rounded-lg border p-4">
                              <RadioGroupItem value={address.id} id={address.id}/>
                              <div className="flex-1">
                                <Label htmlFor={address.id} className="cursor-pointer">
                                  <div className="font-medium">{address.name}</div>
                                  <div className="text-sm text-muted-foreground">
                                    {address.address}, {address.city}, {address.province} {address.postalCode}
                                  </div>
                                  <div className="text-sm text-muted-foreground">{address.country}</div>
                                </Label>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleEditAddress(address)}
                                >
                                  <Edit className="h-4 w-4"/>
                                </Button>
                              </div>
                            </div>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
              </div>

              <div className="rounded-lg border p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-medium">Payment Method</h2>
                </div>

                <FormField
                  control={checkoutForm.control}
                  name="paymentMethod"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Choose Payment Method</FormLabel>
                      <FormControl>
                        <RadioGroup  value={field.value} onValueChange={field.onChange} className="space-y-3">
                          {paymentMethods.map((payment) => (
                            <div key={payment.id} className="flex items-center space-x-3 rounded-lg border p-4">
                              <RadioGroupItem value={payment.id ?? ""} id={payment.id}/>
                              <div className="flex-1">
                                <Label htmlFor={payment.id} className="cursor-pointer">
                                  <div className="flex items-center gap-2">
                                    <payment.icon className="h-4 w-4"/>
                                    <span className="font-medium">{payment.label}</span>
                                  </div>
                                </Label>
                              </div>
                            </div>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
          <div className="rounded-lg border p-6 my-4">
            <h2 className="mb-4 text-lg font-medium">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : `$${shipping}`}</span>
              </div>
              {/*<div className="flex justify-between">*/}
              {/*  <span>Tax</span>*/}
              {/*  <span>${tax.toFixed(2)}</span>*/}
              {/*</div>*/}
              <Separator className="my-4"/>
              <div className="flex justify-between text-lg font-medium">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <Button
              onClick={checkoutForm.handleSubmit(onCheckoutSubmit)}
              className="mt-6 w-full"
              disabled={cartItems.length === 0}
            >
              Checkout Now
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={isConfirmationOpen} onOpenChange={setIsConfirmationOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div
              className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
              <Check className="h-8 w-8 text-green-600 dark:text-green-300"/>
            </div>
            <DialogTitle className="text-center">Order Confirmed!</DialogTitle>
            <DialogDescription className="text-center">
              Thank you for your purchase. Your order has been successfully placed.
            </DialogDescription>
          </DialogHeader>
          <div className="text-center">
            <div className="mb-4 rounded-lg bg-muted p-4">
              <p className="mb-2 font-medium">Order Number:</p>
              <p className="text-xl font-bold">{orderNumber}</p>
            </div>
            <p className="text-sm text-muted-foreground">A confirmation email has been sent to your email address.</p>
          </div>
          <DialogFooter>
            <Button onClick={handleOrderConfirmation} className="w-full">
              Continue Shopping
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <AddressDialog showAddressDialog={showAddressDialog} setShowAddressDialog={setShowAddressDialog} editingAddress={editingAddress} getAddresses={getAddresses} />
    </div>
  )
}



