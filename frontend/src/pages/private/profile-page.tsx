import {useEffect, useState} from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button.tsx"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog.tsx"
import ProfileAvatarCard from "@/components/profile/profile-avatar-card.tsx";
import ProfileDataCard from "@/components/profile/profile-data-card.tsx";
import ProfileForm from "@/components/profile/profile-form.tsx";
import AddressForm from "@/components/profile/address-form.tsx";
import type {Nullable} from "@/models/types/utils";
import type {AddressResponse} from "@/models/dto/response/address-response.ts";
import AddressCard from "@/components/profile/address-card.tsx";
import {useMutation} from "@tanstack/react-query";
import {AddressService} from "@/services/address-service.ts";
import {ToastService} from "@/utils/toast.ts";

export default function Profile() {
  const [editingProfile, setEditingProfile] = useState(false)
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

  return (
    <>
      {/* Optional */}
      {/*<header className="border-b">*/}
      {/*  <div className="container mx-auto px-4 py-4">*/}
      {/*    <div className="flex items-center gap-4">*/}
      {/*      <Button variant="ghost" size="icon" asChild>*/}
      {/*        <Link to="/">*/}
      {/*          <ArrowLeft className="h-5 w-5" />*/}
      {/*        </Link>*/}
      {/*      </Button>*/}
      {/*      <h1 className="text-xl font-semibold">My Profile</h1>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</header>*/}

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Profile Information
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditingProfile(!editingProfile)
                  }}
                >
                  {editingProfile ? "Cancel" : "Edit"}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <ProfileAvatarCard />

              {editingProfile ? (
                <ProfileForm />
              ) : (
                <ProfileDataCard />
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Shipping Addresses
                <Button onClick={handleAddAddress} size="sm" className="">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Address
                </Button>
              </CardTitle>
            </CardHeader>
            <AddressCard addresses={addresses} getAddresses={getAddresses} handleEditAddress={handleEditAddress} />
          </Card>
        </div>
      </div>

      <Dialog open={showAddressDialog} onOpenChange={setShowAddressDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingAddress ? "Edit Address" : "Add New Address"}</DialogTitle>
          </DialogHeader>
          <AddressForm getAddresses={getAddresses}  setShowAddressDialog={setShowAddressDialog} editingAddress={editingAddress} />
        </DialogContent>
      </Dialog>
    </>
  )
}
