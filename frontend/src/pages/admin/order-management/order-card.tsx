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
import AdminActionButtons from "./admin-action-button";
import OrderItemComponent from "./order-items";
import StatusHistoryComponent from "./status-history";

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

interface CustomerInfoProps {
  customer: Order["customer"];
}

const CustomerInfo: React.FC<CustomerInfoProps> = ({ customer }) => (
  <div>
    <h4 className="font-medium  mb-3 flex items-center space-x-2">
      <User className="w-4 h-4" />
      <span>Customer Information</span>
    </h4>
    <div className="p-3  rounded-lg space-y-1">
      <p className="font-medium ">{customer.name}</p>
      <p className="text-sm ">{customer.email}</p>
      <p className="text-sm ">{customer.phone}</p>
    </div>
  </div>
);

interface AdminOrderCardProps {
  order: Order;
  isExpanded: boolean;
  onToggleExpansion: () => void;
  onStatusUpdate: (orderId: string, newStatus: string, note: string) => void;
}

const AdminOrderCard: React.FC<AdminOrderCardProps> = ({
  order,
  isExpanded,
  onToggleExpansion,
  onStatusUpdate,
}) => {
  const [isEditingStatus, setIsEditingStatus] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleEditStatus = () => {
    setIsEditingStatus(true);
  };

  const handleStatusUpdate = (
    orderId: string,
    newStatus: string,
    note: string
  ) => {
    onStatusUpdate(orderId, newStatus, note);
    setIsEditingStatus(false);
  };

  const handleCancelEdit = () => {
    setIsEditingStatus(false);
  };

  return (
    <div className="p-6  transition-colors">
      {/* Order Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div>
            <p className="font-semibold ">Order #{order.id}</p>
            <div className="flex items-center space-x-2 mt-1">
              <Calendar className="w-4 h-4 " />
              <p className="text-sm ">{formatDate(order.date)}</p>
            </div>
          </div>
          <AdminStatusBadge status={order.status} />
          {/* <PriorityBadge priority={order.priority} /> */}
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="font-semibold ">
              ${order.total.toFixed(2)}
            </p>
            <p className="text-sm ">{order.items.length} items</p>
          </div>
          <button
            onClick={onToggleExpansion}
            className="p-2 rounded-full transition-colors"
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Customer and Payment Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
        <div>
          <p className="">Customer:</p>
          <p className="font-medium">{order.customer.name}</p>
        </div>
        <div>
          <p className="">Payment:</p>
          <p className="font-medium">{order.paymentMethod}</p>
        </div>
        <div>
          <p className="">Priority:</p>
          <p className="font-medium capitalize">{order.priority}</p>
        </div>
      </div>

      {/* Tracking Info */}
      {order.trackingNumber && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            Tracking Number:{" "}
            <span className="font-mono font-medium">
              {order.trackingNumber}
            </span>
          </p>
        </div>
      )}

      {/* Order Details (Expandable) */}
      {isExpanded && (
        <div className="mt-6 space-y-6">
          {/* Admin Status Update */}
          {isEditingStatus ? (
            <AdminEditStatus
              orderId={order.id}
              currentStatus={order.status}
              onStatusUpdate={handleStatusUpdate}
              onCancel={handleCancelEdit}
            />
          ) : (
            <AdminActionButtons
              order={order}
              isEditing={isEditingStatus}
              onEdit={handleEditStatus}
              onCancel={handleCancelEdit}
            />
          )}

          {/* Customer Info */}
          <CustomerInfo customer={order.customer} />

          {/* Items */}
          <div>
            <h4 className="font-medium text-black mb-3">Items Ordered</h4>
            <div className="space-y-3">
              {order.items.map((item) => (
                <OrderItemComponent key={item.id} item={item} />
              ))}
            </div>
          </div>

          {/* Status History */}
          <StatusHistoryComponent history={order.statusHistory} />

          {/* Admin Notes */}
          {order.notes && (
            <div>
              <h4 className="font-medium  mb-3">Admin Notes</h4>
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">{order.notes}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminOrderCard;