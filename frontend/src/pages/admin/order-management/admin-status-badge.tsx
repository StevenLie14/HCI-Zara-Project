import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Truck,
  X,
  Clock,
  MoreHorizontal,
  Pencil,
} from "lucide-react";
import { useState } from "react";

const getStatusIcon = (status: string) => {
  switch (status) {
    case "DELIVERED":
      return <CheckCircle className="w-4 h-4 text-green-600" />;
    case "SHIPPED":
      return <Truck className="w-4 h-4 text-blue-600" />;
    case "CANCELLED":
      return <X className="w-4 h-4 text-red-600" />;
    case "PENDING":
      return <Clock className="w-4 h-4 text-yellow-600" />;
    default:
      return <MoreHorizontal className="w-4 h-4 text-gray-400" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "DELIVERED":
      return "text-green-600 bg-green-50 border-green-200";
    case "SHIPPED":
      return "text-blue-600 bg-blue-50 border-blue-200";
    case "CANCELLED":
      return "text-red-600 bg-red-50 border-red-200";
    case "PENDING":
      return "text-yellow-600 bg-yellow-50 border-yellow-200";
    default:
      return "text-gray-600 bg-gray-50 border-gray-200";
  }
};

const StatusBadge =
  ({
    id,
     status,
     onStatusChange,
   }: {
  id: string;
  status: string;
  onStatusChange: (id: string,newStatus: string) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempStatus, setTempStatus] = useState(status);
  const [dialogOpen, setDialogOpen] = useState(false);

  const statusOptions = [
    "PENDING",
    "SHIPPED",
    "DELIVERED",
    "CANCELLED",
  ];

  return (
    <>
      {isEditing ? (
        <div className="flex items-center gap-2">
          <Select
            value={tempStatus}
            onValueChange={(value) => setTempStatus(value)}
          >
            <SelectTrigger className="w-[160px] text-sm">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((s) => (
                <SelectItem key={s} value={s}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            size="sm"
            onClick={() => setDialogOpen(true)}
            variant="default"
          >
            OK
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              setIsEditing(false);
              setTempStatus(status);
            }}
          >
            Cancel
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <div
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium border ${getStatusColor(
              status
            )}`}
          >
            {getStatusIcon(status)}
            <span className="capitalize">{status}</span>
          </div>
          <Button
            size="icon"
            variant="ghost"
            className="h-7 w-7"
            onClick={() => setIsEditing(true)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Status Change</DialogTitle>
            <DialogDescription>
              Are you sure you want to change the status from{" "}
              <strong className="capitalize">{status}</strong> to{" "}
              <strong className="capitalize">{tempStatus}</strong>?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                onStatusChange(id,tempStatus);
                setIsEditing(false);
                setDialogOpen(false);
              }}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default StatusBadge;
