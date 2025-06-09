import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import AddressForm from "@/components/profile/address-form.tsx";
import type {AddressResponse} from "@/models/dto/response/address-response.ts";
import type {Nullable} from "@/models/types/utils";
import type {UseMutationResult} from "@tanstack/react-query";

interface IProps {
  showAddressDialog: boolean
  setShowAddressDialog: (show: boolean) => void
  editingAddress: Nullable<AddressResponse>
  getAddresses: UseMutationResult<AddressResponse[], Error, void>
}

const AddressDialog = ({showAddressDialog, setShowAddressDialog, editingAddress, getAddresses} : IProps) => {
  return (
    <Dialog open={showAddressDialog} onOpenChange={setShowAddressDialog}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{editingAddress ? "Edit Address" : "Add New Address"}</DialogTitle>
        </DialogHeader>
        <AddressForm getAddresses={getAddresses}  setShowAddressDialog={setShowAddressDialog} editingAddress={editingAddress} />
      </DialogContent>
    </Dialog>
  )
}

export default AddressDialog;