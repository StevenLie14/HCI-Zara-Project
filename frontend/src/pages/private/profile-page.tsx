import type React from "react"

import { useState } from "react"
import { Plus, Edit2, Trash2, MapPin, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import ProfileAvatarCard from "@/components/profile/profile-avatar-card.tsx";
import ProfileDataCard from "@/components/profile/profile-data-card.tsx";
import ProfileForm from "@/components/profile/profile-form.tsx";


interface ShippingAddress {
  id: string
  name: string
  street: string
  city: string
  state: string
  zipCode: string
  country: string
  phone: string
  isDefault: boolean
}

interface UserProfile {
  name: string
  email: string
  phone: string
  avatar: string
  gender: string
  dateOfBirth: string
  memberSince: string
}

export default function Profile() {
  const [profile, setProfile] = useState<UserProfile>({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    avatar: "/placeholder.svg?height=100&width=100",
    gender: "male",
    dateOfBirth: "1990-05-15",
    memberSince: "2022-03-15",
  })

  const [addresses, setAddresses] = useState<ShippingAddress[]>([
    {
      id: "1",
      name: "John Doe",
      street: "123 Main Street, Apt 4B",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
      phone: "+1 (555) 123-4567",
      isDefault: true,
    },
    {
      id: "2",
      name: "John Doe",
      street: "456 Oak Avenue",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90210",
      country: "United States",
      phone: "+1 (555) 987-6543",
      isDefault: false,
    },
  ])

  const [editingProfile, setEditingProfile] = useState(false)
  const [editingAddress, setEditingAddress] = useState<ShippingAddress | null>(null)
  const [showAddressDialog, setShowAddressDialog] = useState(false)
  const [profileForm, setProfileForm] = useState(profile)
  const [addressForm, setAddressForm] = useState<Partial<ShippingAddress>>({})


  const handleAddAddress = () => {
    setAddressForm({
      name: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      phone: "",
      isDefault: false,
    })
    setEditingAddress(null)
    setShowAddressDialog(true)
  }

  const handleEditAddress = (address: ShippingAddress) => {
    setAddressForm(address)
    setEditingAddress(address)
    setShowAddressDialog(true)
  }

  const handleSaveAddress = () => {
    if (!addressForm.name || !addressForm.street || !addressForm.city) {
      return
    }


    setTimeout(() => {
      if (editingAddress) {
        // Update existing address
        setAddresses((prev) =>
          prev.map((addr) =>
            addr.id === editingAddress.id ? { ...(addressForm as ShippingAddress), id: editingAddress.id } : addr,
          ),
        )
      } else {
        // Add new address
        const newAddress: ShippingAddress = {
          ...(addressForm as ShippingAddress),
          id: Date.now().toString(),
        }
        setAddresses((prev) => [...prev, newAddress])
      }

      setShowAddressDialog(false)
      setAddressForm({})
      setEditingAddress(null)
    }, 1000)
  }

  const handleDeleteAddress = (addressId: string) => {
    const addressToDelete = addresses.find((addr) => addr.id === addressId)
    if (addressToDelete?.isDefault) {
      return
    }


    setTimeout(() => {
      setAddresses((prev) => prev.filter((addr) => addr.id !== addressId))
    }, 800)
  }

  const handleSetDefaultAddress = (addressId: string) => {

    setTimeout(() => {
      setAddresses((prev) =>
        prev.map((addr) => ({
          ...addr,
          isDefault: addr.id === addressId,
        })),
      )
    }, 800)
  }

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
          {/* Profile Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Profile Information
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditingProfile(!editingProfile)
                    setProfileForm(profile)
                  }}
                >
                  {editingProfile ? "Cancel" : "Edit"}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <ProfileAvatarCard />

              {/* Profile Form */}
              {editingProfile ? (
                <ProfileForm />
              ) : (
                <ProfileDataCard />
              )}
            </CardContent>
          </Card>

          {/* Shipping Addresses */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Shipping Addresses
                <Button onClick={handleAddAddress} size="sm" className="bg-black hover:bg-gray-800">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Address
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {addresses.map((address) => (
                  <div
                    key={address.id}
                    className={`p-4 border rounded-lg ${address.isDefault ? "border-black bg-gray-50" : "border-gray-200"}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span className="font-medium">{address.name}</span>
                          {address.isDefault && (
                            <span className="bg-black text-white text-xs px-2 py-1 rounded">Default</span>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm mb-1">{address.street}</p>
                        <p className="text-gray-600 text-sm mb-1">
                          {address.city}, {address.state} {address.zipCode}
                        </p>
                        <p className="text-gray-600 text-sm mb-1">{address.country}</p>
                        <p className="text-gray-600 text-sm">{address.phone}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {!address.isDefault && (
                          <Button variant="outline" size="sm" onClick={() => handleSetDefaultAddress(address.id)}>
                            Set Default
                          </Button>
                        )}
                        <Button variant="outline" size="sm" onClick={() => handleEditAddress(address)}>
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        {!address.isDefault && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteAddress(address.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Address Dialog */}
      <Dialog open={showAddressDialog} onOpenChange={setShowAddressDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingAddress ? "Edit Address" : "Add New Address"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="addressName">Full Name *</Label>
              <Input
                id="addressName"
                value={addressForm.name || ""}
                onChange={(e) => setAddressForm((prev) => ({ ...prev, name: e.target.value }))}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="street">Street Address *</Label>
              <Textarea
                id="street"
                value={addressForm.street || ""}
                onChange={(e) => setAddressForm((prev) => ({ ...prev, street: e.target.value }))}
                className="mt-1"
                rows={2}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={addressForm.city || ""}
                  onChange={(e) => setAddressForm((prev) => ({ ...prev, city: e.target.value }))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="state">State *</Label>
                <Input
                  id="state"
                  value={addressForm.state || ""}
                  onChange={(e) => setAddressForm((prev) => ({ ...prev, state: e.target.value }))}
                  className="mt-1"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="zipCode">ZIP Code *</Label>
                <Input
                  id="zipCode"
                  value={addressForm.zipCode || ""}
                  onChange={(e) => setAddressForm((prev) => ({ ...prev, zipCode: e.target.value }))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="country">Country *</Label>
                <Input
                  id="country"
                  value={addressForm.country || ""}
                  onChange={(e) => setAddressForm((prev) => ({ ...prev, country: e.target.value }))}
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="addressPhone">Phone Number</Label>
              <Input
                id="addressPhone"
                value={addressForm.phone || ""}
                onChange={(e) => setAddressForm((prev) => ({ ...prev, phone: e.target.value }))}
                className="mt-1"
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isDefault"
                checked={addressForm.isDefault || false}
                onChange={(e) => setAddressForm((prev) => ({ ...prev, isDefault: e.target.checked }))}
              />
              <Label htmlFor="isDefault">Set as default address</Label>
            </div>
            <div className="flex gap-3 pt-4">
              <Button variant="outline" onClick={() => setShowAddressDialog(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleSaveAddress} className="flex-1 bg-black hover:bg-gray-800">
                {editingAddress ? "Update" : "Add"} Address
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
