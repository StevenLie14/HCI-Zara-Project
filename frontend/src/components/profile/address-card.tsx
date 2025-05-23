import {Edit2, MapPin, Trash2} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {CardContent} from "@/components/ui/card.tsx";
import {useMutation, type UseMutationResult} from "@tanstack/react-query";
import {ToastService} from "@/utils/toast.ts";
import type {AddressResponse} from "@/models/dto/response/address-response.ts";
import {AddressService} from "@/services/address-service.ts";

interface IProps {
  handleEditAddress: (address: AddressResponse) => void;
  getAddresses: UseMutationResult<AddressResponse[], Error, void>
  addresses: AddressResponse[]
}
const AddressCard = ({handleEditAddress, getAddresses, addresses} : IProps) => {

  const deleteAddress = useMutation({
    mutationFn : AddressService.deleteAddress,
    onSuccess: () => {
      getAddresses.mutate()
      ToastService.success("Address deleted successfully")
    },
    onError: (error) => {
      ToastService.error(error.message)
    },
  })

  return (
    <CardContent>
      <div className="space-y-4">
        {addresses.map((address) => (
          <div
            key={address.id}
            className={`p-4 border rounded-lg`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4" />
                  <span className="font-medium">{address.name}</span>
                </div>
                <div className="text-sm leading-5">
                  <p>{address.address}</p>
                  <p>
                    {address.city}, {address.province} {address.postalCode}
                  </p>
                  <p>{address.country}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEditAddress(address)}>
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => deleteAddress.mutate(address.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  )
}

export default AddressCard;