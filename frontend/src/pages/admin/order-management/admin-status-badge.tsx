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

// Admin Status Badge Component
interface AdminStatusBadgeProps {
  status: string;
  isEditing?: boolean;
  onStatusChange?: (status: string) => void;
}

const AdminStatusBadge: React.FC<AdminStatusBadgeProps> = ({
  status,
  isEditing,
  onStatusChange,
}) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "shipped":
        return <Truck className="w-4 h-4 text-blue-600" />;
      case "processing":
        return <Package className="w-4 h-4 text-orange-600" />;
      case "cancelled":
        return <X className="w-4 h-4 text-red-600" />;
      case "refunded":
        return <AlertTriangle className="w-4 h-4 text-purple-600" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      default:
        return <MoreHorizontal className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "text-green-600 bg-green-50 border-green-200";
      case "shipped":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "processing":
        return "text-orange-600 bg-orange-50 border-orange-200";
      case "cancelled":
        return "text-red-600 bg-red-50 border-red-200";
      case "refunded":
        return "text-purple-600 bg-purple-50 border-purple-200";
      case "pending":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  if (isEditing && onStatusChange) {
    return (
      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="pending">Pending</option>
        <option value="processing">Processing</option>
        <option value="shipped">Shipped</option>
        <option value="delivered">Delivered</option>
        <option value="cancelled">Cancelled</option>
        <option value="refunded">Refunded</option>
      </select>
    );
  }

  return (
    <div
      className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium border ${getStatusColor(
        status
      )}`}
    >
      {getStatusIcon(status)}
      <span className="capitalize">{status}</span>
    </div>
  );
};

export default AdminStatusBadge;