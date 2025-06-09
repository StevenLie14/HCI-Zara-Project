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

interface AdminEditStatusProps {
  orderId: string;
  currentStatus: string;
  onStatusUpdate: (orderId: string, newStatus: string, note: string) => void;
  onCancel: () => void;
}

const AdminEditStatus: React.FC<AdminEditStatusProps> = ({
  orderId,
  currentStatus,
  onStatusUpdate,
  onCancel,
}) => {
  const [newStatus, setNewStatus] = useState(currentStatus);
  const [note, setNote] = useState("");

  const handleSave = () => {
    onStatusUpdate(orderId, newStatus, note);
  };

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-4">
      <h4 className="font-medium text-black flex items-center space-x-2">
        <Edit3 className="w-4 h-4" />
        <span>Update Order Status</span>
      </h4>

      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            New Status
          </label>
          <AdminStatusBadge
            status={newStatus}
            isEditing={true}
            onStatusChange={setNewStatus}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Admin Note (Optional)
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add a note about this status change..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={3}
          />
        </div>
      </div>

      <div className="flex space-x-3">
        <button
          onClick={handleSave}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
        >
          <Save className="w-4 h-4" />
          <span>Update Status</span>
        </button>
        <button
          onClick={onCancel}
          className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors"
        >
          <X className="w-4 h-4" />
          <span>Cancel</span>
        </button>
      </div>
    </div>
  );
};

export default AdminEditStatus;