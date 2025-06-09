import React, { useState } from "react";
import AdminOrderCard from "./order-management/order-card";

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



// Main Admin Order Management Component
const AdminOrderManagement: React.FC = () => {
  const [expandedOrders, setExpandedOrders] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD-2024-001",
      date: "2024-05-15",
      status: "delivered",
      total: 189.97,
      trackingNumber: "ZR123456789",
      priority: "medium",
      paymentMethod: "Credit Card",
      customer: {
        name: "Jonathan Smith",
        email: "jonathan.smith@email.com",
        phone: "+44 20 7123 4567",
      },
      items: [
        {
          id: "1",
          name: "BASIC T-SHIRT",
          size: "M",
          color: "White",
          price: 29.99,
          quantity: 2,
          image: "/api/placeholder/80/80",
        },
        {
          id: "2",
          name: "STRAIGHT FIT JEANS",
          size: "32",
          color: "Blue",
          price: 89.99,
          quantity: 1,
          image: "/api/placeholder/80/80",
        },
      ],
      shippingAddress: {
        name: "Jonathan Smith",
        address: "123 Baker Street",
        city: "London, Greater London, W1U 6QX",
        country: "United Kingdom",
      },
      statusHistory: [
        {
          status: "pending",
          timestamp: "2024-05-15T10:00:00Z",
          updatedBy: "System",
          note: "Order placed",
        },
        {
          status: "processing",
          timestamp: "2024-05-15T14:30:00Z",
          updatedBy: "Admin User",
          note: "Payment confirmed, preparing for shipment",
        },
        {
          status: "shipped",
          timestamp: "2024-05-16T09:15:00Z",
          updatedBy: "Warehouse Team",
          note: "Package dispatched via courier",
        },
        {
          status: "delivered",
          timestamp: "2024-05-18T16:45:00Z",
          updatedBy: "Delivery System",
          note: "Successfully delivered to customer",
        },
      ],
    },
    {
      id: "ORD-2024-002",
      date: "2024-05-22",
      status: "processing",
      total: 124.98,
      priority: "high",
      paymentMethod: "PayPal",
      customer: {
        name: "Sarah Johnson",
        email: "sarah.johnson@email.com",
        phone: "+44 20 7987 6543",
      },
      items: [
        {
          id: "4",
          name: "CROPPED BLAZER",
          size: "S",
          color: "Navy",
          price: 79.99,
          quantity: 1,
          image: "/api/placeholder/80/80",
        },
        {
          id: "5",
          name: "MIDI SKIRT",
          size: "M",
          color: "Beige",
          price: 44.99,
          quantity: 1,
          image: "/api/placeholder/80/80",
        },
      ],
      shippingAddress: {
        name: "Sarah Johnson",
        address: "456 Oxford Street",
        city: "London, Greater London, W1C 1AP",
        country: "United Kingdom",
      },
      statusHistory: [
        {
          status: "pending",
          timestamp: "2024-05-22T11:30:00Z",
          updatedBy: "System",
          note: "Order placed",
        },
        {
          status: "processing",
          timestamp: "2024-05-22T15:45:00Z",
          updatedBy: "Admin User",
          note: "High priority order - expedited processing",
        },
      ],
      notes: "Customer requested expedited shipping",
    },
  ]);

  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handleStatusUpdate = (
    orderId: string,
    newStatus: string,
    note: string
  ) => {
    const timestamp = new Date().toISOString();

    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: newStatus as Order["status"],
              statusHistory: [
                ...order.statusHistory,
                {
                  status: newStatus,
                  timestamp,
                  updatedBy: "Admin User",
                  note: note || `Status updated to ${newStatus}`,
                },
              ],
            }
          : order
      )
    );
  };

  return (
    <div className="min-h-screen ">

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Orders Table */}
        <div className=" rounded-lg shadow-sm">
          <div className="p-6 border-b ">
            <h2 className="text-2xl font-semibold ">
              Order Management
            </h2>
            <p className=" mt-1">
              Manage and track all customer orders
            </p>
          </div>

          <div className="divide-y ">
            {orders.map((order) => (
              <AdminOrderCard
                key={order.id}
                order={order}
                isExpanded={expandedOrders.includes(order.id)}
                onToggleExpansion={() => toggleOrderExpansion(order.id)}
                onStatusUpdate={handleStatusUpdate}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderManagement;
