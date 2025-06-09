import {useEffect, useState} from "react";
import type {Nullable} from "@/models/types/utils";
import type {AddressResponse} from "@/models/dto/response/address-response.ts";
import {useMutation} from "@tanstack/react-query";
import {AddressService} from "@/services/address-service.ts";
import {ToastService} from "@/utils/toast.ts";

export default function useAddress () {
  const [editingAddress, setEditingAddress] = useState<Nullable<AddressResponse>>(null)
  const [showAddressDialog, setShowAddressDialog] = useState(false)
  const [addresses, setAddresses] = useState<AddressResponse[]>([])

  const getAddresses = useMutation({
    mutationFn : AddressService.getAddresses,
    onSuccess: (data) => {
      setAddresses(data)
    },
    onError: (error) => {
      ToastService.error(error.message)
    },
  })


  const handleAddAddress = () => {
    setEditingAddress(null)
    setShowAddressDialog(true)
  }

  const handleEditAddress = (address: AddressResponse) => {
    setEditingAddress(address)
    setShowAddressDialog(true)
  }

  useEffect(() => {
    getAddresses.mutate()
  }, []);

  return {editingAddress, handleAddAddress, handleEditAddress, showAddressDialog, setShowAddressDialog, addresses, getAddresses, setAddresses, setEditingAddress}

}