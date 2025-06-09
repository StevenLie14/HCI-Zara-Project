import React, { useState } from "react";
import {
  Package,
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

interface OrderItemProps {
  item: OrderItem;
}

const OrderItemComponent: React.FC<OrderItemProps> = ({ item }) => (
  <div className="flex items-center space-x-4 p-3  rounded-lg">
    <div className="w-16 h-16  rounded-lg flex items-center justify-center">
      <Package className="w-6 h-6 " />
    </div>
    <div className="flex-1">
      <h5 className="font-medium ">{item.name}</h5>
      <p className="text-sm ">
        Size: {item.size} • Color: {item.color} • Qty: {item.quantity}
      </p>
    </div>
    <div className="text-right">
      <p className="font-medium ">${item.price.toFixed(2)}</p>
      {item.quantity > 1 && <p className="text-sm ">each</p>}
    </div>
  </div>
);

export default OrderItemComponent;
