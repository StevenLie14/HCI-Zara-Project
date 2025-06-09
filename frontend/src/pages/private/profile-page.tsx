import {useState} from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button.tsx"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx"
import ProfileAvatarCard from "@/components/profile/profile-avatar-card.tsx";
import ProfileDataCard from "@/components/profile/profile-data-card.tsx";
import ProfileForm from "@/components/profile/profile-form.tsx";
import AddressCard from "@/components/profile/address-card.tsx";
import useAddress from "@/hooks/use-address.ts";
import AddressDialog from "@/components/profile/address-dialog.tsx";

export default function Profile() {
  const [editingProfile, setEditingProfile] = useState(false)
  const { editingAddress, handleAddAddress, handleEditAddress, showAddressDialog, setShowAddressDialog, addresses, getAddresses } = useAddress()

  return (
    <>
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

      <AddressDialog showAddressDialog={showAddressDialog} setShowAddressDialog={setShowAddressDialog} editingAddress={editingAddress} getAddresses={getAddresses} />
    </>
  )
}
