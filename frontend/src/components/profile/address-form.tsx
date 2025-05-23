import { Form, FormControl, FormField, FormItem, FormMessage, FormLabel } from "@/components/ui/form"
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {type AddressRequest, addressSchema} from "@/models/dto/request/user/create-or-update-address-request.ts";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import type {Nullable} from "@/models/types/utils";
import type {AddressResponse} from "@/models/dto/response/address-response.ts";
import {ToastService} from "@/utils/toast.ts";
import {AddressService} from "@/services/address-service.ts";
import {useMutation, type UseMutationResult} from "@tanstack/react-query";

interface IProps {
  setShowAddressDialog: (show: boolean) => void
  editingAddress: Nullable<AddressResponse>
  getAddresses: UseMutationResult<AddressResponse[], Error, void>
}
const AddressForm = ({setShowAddressDialog, editingAddress, getAddresses} : IProps) => {

  const addressForm = useForm<AddressRequest>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      name: editingAddress? editingAddress.name : undefined,
      address: editingAddress? editingAddress.address : undefined,
      city: editingAddress? editingAddress.city : undefined,
      province: editingAddress? editingAddress.province : undefined,
      postalCode: editingAddress? editingAddress.postalCode : undefined,
      country: editingAddress? editingAddress.country : undefined,
    },
  })

  const addressMutation = useMutation({
    mutationFn: (data: AddressRequest) => {
      if (editingAddress) {
        return AddressService.updateAddress(editingAddress.id, data)
      } else {
        return AddressService.createAddress(data)
      }
    },
    onSuccess: () => {
      ToastService.success(editingAddress ? "Address updated successfully" : "Address added successfully")
      getAddresses.mutate()
      setShowAddressDialog(false)
    },
    onError: (error) => {
      ToastService.error(error.message)
    },
  })

  const onAddressSubmit = (data: AddressRequest) => {
    addressMutation.mutate(data)
  }

  return (
    <Form {...addressForm}>
      <form onSubmit={addressForm.handleSubmit(onAddressSubmit)} className="space-y-4">
        <FormField
          control={addressForm.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name *</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={addressForm.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Street Address *</FormLabel>
              <FormControl>
                <Textarea rows={2} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={addressForm.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City *</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={addressForm.control}
            name="province"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Province *</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={addressForm.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Postal Code *</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={addressForm.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country *</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-3 pt-4">
          <Button disabled={addressMutation.isPending} type="button" variant="outline" onClick={() => setShowAddressDialog(false)} className="flex-1">
            Cancel
          </Button>
          <Button disabled={addressMutation.isPending} type="submit" className="flex-1">
            {
              addressMutation.isPending ? "Saving..." : editingAddress ? "Update" : "Add"
            }
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default AddressForm