import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom"
import {Plus, Edit, AlertTriangle} from "lucide-react"
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
import {
  type CreateTransactionRequest,
  createTransactionSchema
} from "@/models/dto/request/transaction/create-transaction-request.ts";
import {useCarts} from "@/context/cart-context.tsx";
import {loadImage} from "@/utils/utils.ts";
import {useMutation} from "@tanstack/react-query";
import {TransactionService} from "@/services/transaction-service.ts";

export default function CheckoutPage() {

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
  const { editingAddress, handleAddAddress, handleEditAddress, showAddressDialog, setShowAddressDialog, addresses, getAddresses } = useAddress()

  const navigate = useNavigate()

  const shipping = 0

  const {carts} = useCarts()
  const subtotal = carts.reduce((total, item) => total + item.variant.price * item.quantity, 0)
  const total = subtotal + shipping

  const checkoutForm = useForm<CreateTransactionRequest>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      shippingAddressId: addresses[0]?.id || undefined,
      paymentMethod: paymentMethods[0].id,
    },
  })

  const transactionMutation = useMutation({
    mutationFn: TransactionService.createTransaction,
    onSuccess: () => {
      ToastService.success("Checkout successful", "Your order has been placed successfully.");
      navigate("/order-history");
    },
    onError: (error) => {
      ToastService.error("Checkout failed", error.message || "An error occurred during checkout.");
    }
  })

  const onCheckoutSubmit = (request: CreateTransactionRequest) => {
    if (carts.length === 0) {
      ToastService.error("Your cart is empty", "Please add items to your cart before proceeding to checkout.")
      return
    }
    transactionMutation.mutate(request)

    setIsConfirmationOpen(false)
  }

  const handleCheckOut = checkoutForm.handleSubmit(
    (_) => {
      setIsConfirmationOpen(true);
    },
    (_) => {
      ToastService.error("Form validation failed.", "Please check the form for errors.");
    }
  );


  if (carts.length === 0) {
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
          You have {carts.length} item{carts.length !== 1 ? "s" : ""} in your cart
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
                  {carts.map((item) => (
                    <div key={`${item.id}-${item.variant.color}-${item.variant.size}`} className="flex gap-4">
                      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                        <img
                          src={loadImage(item.variant.variantImage) || "/placeholder.svg"}
                          alt={item.product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex flex-1 justify-between">
                        <div>
                          <h3 className="font-medium">{item.product.name}</h3>
                          <div className="flex gap-2 text-sm text-muted-foreground">
                            {item.variant.color && (
                              <div>
                                Color: {item.variant.color}
                              </div>
                            )}
                            {item.variant.size && <div>Size: {item.variant.size}</div>}
                          </div>
                          <span className={"text-sm text-muted-foreground"}>Qty: {item.quantity}</span>
                        </div>
                        <div className="font-medium">${(item.variant.price * item.quantity).toFixed(2)}</div>
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
              type={"button"}
              onClick={handleCheckOut}
              className="mt-6 w-full"
              disabled={carts.length === 0}
            >
              Checkout Now
            </Button>
            <Dialog open={isConfirmationOpen} onOpenChange={setIsConfirmationOpen}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900">
                    <AlertTriangle className="h-8 w-8 text-yellow-600 dark:text-yellow-300" />
                  </div>
                  <DialogTitle className="text-center">Confirm Checkout</DialogTitle>
                  <DialogDescription className="text-center">
                    Are you sure you want to proceed with the checkout?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex justify-center gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsConfirmationOpen(false)}
                    className="w-full sm:w-1/2"
                  >
                    No
                  </Button>
                  <Button
                    onClick={checkoutForm.handleSubmit(onCheckoutSubmit)}
                    className="w-full sm:w-1/2"
                  >
                    Yes, Checkout
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>


      <AddressDialog showAddressDialog={showAddressDialog} setShowAddressDialog={setShowAddressDialog} editingAddress={editingAddress} getAddresses={getAddresses} />
    </div>
  )
}



