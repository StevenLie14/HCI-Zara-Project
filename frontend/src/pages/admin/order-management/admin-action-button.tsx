import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Package,
  Truck,
  CheckCircle,
  MoreHorizontal,
  Edit3,
  Save,
  X,
  Shield,
  Clock,
  AlertTriangle,
  User,
  Calendar,
  FileText,
} from "lucide-react";
import AdminStatusBadge from "./admin-status-badge";
import AdminEditStatus from "./admin-edit-status";

// Types
interface OrderItem {
  id: string;
  name: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
  image: string;
}

interface StatusHistory {
  status: string;
  timestamp: string;
  updatedBy: string;
  note?: string;
}

interface Order {
  id: string;
  date: string;
  status:
    | "delivered"
    | "shipped"
    | "processing"
    | "cancelled"
    | "refunded"
    | "pending";
  total: number;
  items: OrderItem[];
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    country: string;
  };
  trackingNumber?: string;
  statusHistory: StatusHistory[];
  priority: "low" | "medium" | "high" | "urgent";
  paymentMethod: string;
  notes?: string;
}

interface AdminActionButtonsProps {
  order: Order;
  isEditing: boolean;
  onEdit: () => void;
  onCancel: () => void;
}

const AdminActionButtons: React.FC<AdminActionButtonsProps> = ({
  order,
  isEditing,
  onEdit,
  onCancel,
}) => {
  if (isEditing) {
    return null; // Actions are handled in AdminEditStatus component
  }

  return (
    <div className="flex flex-wrap gap-3 pt-4">
      <button
        onClick={onEdit}
        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
      >
        <Edit3 className="w-4 h-4" />
        <span>Update Status</span>
      </button>

      <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300  text-sm font-medium rounded-md hover:bg-gray-50 transition-colors">
        <FileText className="w-4 h-4" />
        <span>View Details</span>
      </button>

      <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300  text-sm font-medium rounded-md hover:bg-gray-50 transition-colors">
        <Package className="w-4 h-4" />
        <span>Print Label</span>
      </button>

      {order.status === "shipped" && (
        <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300  text-sm font-medium rounded-md hover:bg-gray-50 transition-colors">
          <Truck className="w-4 h-4" />
          <span>Track Package</span>
        </button>
      )}

      {(order.status === "delivered" || order.status === "cancelled") && (
        <button className="flex items-center space-x-2 px-4 py-2 border border-red-300 text-red-700 text-sm font-medium rounded-md hover:bg-red-50 transition-colors">
          <AlertTriangle className="w-4 h-4" />
          <span>Process Refund</span>
        </button>
      )}
    </div>
  );
};
export default AdminActionButtons;
