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

interface StatusHistoryProps {
  history: StatusHistory[];
}

const StatusHistoryComponent: React.FC<StatusHistoryProps> = ({ history }) => (
  <div>
    <h4 className="font-medium  mb-3 flex items-center space-x-2">
      <Clock className="w-4 h-4" />
      <span>Status History</span>
    </h4>
    <div className="space-y-3">
      {history.map((entry, index) => (
        <div
          key={index}
          className="flex items-start space-x-3 p-3  rounded-lg"
        >
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <span className="font-medium text-sm capitalize">
                {entry.status}
              </span>
              <span className="text-xs ">
                {new Date(entry.timestamp).toLocaleDateString()} at{" "}
                {new Date(entry.timestamp).toLocaleTimeString()}
              </span>
            </div>
            <p className="text-xs  mt-1">
              Updated by: {entry.updatedBy}
            </p>
            {entry.note && (
              <p className="text-xs mt-1 italic">
                Note: {entry.note}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);
export default StatusHistoryComponent;