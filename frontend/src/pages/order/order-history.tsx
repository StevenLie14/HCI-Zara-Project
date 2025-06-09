import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Package,
  Truck,
  CheckCircle,
  MoreHorizontal,
} from "lucide-react";

interface OrderItem {
  id: string;
  name: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  date: string;
  status: "delivered" | "shipped" | "processing" | "cancelled";
  total: number;
  items: OrderItem[];
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    country: string;
  };
  trackingNumber?: string;
}

const OrderHistory: React.FC = () => {
  const [expandedOrders, setExpandedOrders] = useState<string[]>([]);

  const mockOrders: Order[] = [
    {
      id: "ORD-2024-001",
      date: "2024-05-15",
      status: "delivered",
      total: 189.97,
      trackingNumber: "ZR123456789",
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
        {
          id: "3",
          name: "KNIT SWEATER",
          size: "L",
          color: "Black",
          price: 39.99,
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
    },
    {
      id: "ORD-2024-002",
      date: "2024-05-22",
      status: "shipped",
      total: 124.98,
      trackingNumber: "ZR987654321",
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
        name: "Jonathan Smith",
        address: "123 Baker Street",
        city: "London, Greater London, W1U 6QX",
        country: "United Kingdom",
      },
    },
    {
      id: "ORD-2024-003",
      date: "2024-05-28",
      status: "processing",
      total: 67.98,
      items: [
        {
          id: "6",
          name: "BASIC POLO SHIRT",
          size: "L",
          color: "White",
          price: 34.99,
          quantity: 1,
          image: "/api/placeholder/80/80",
        },
        {
          id: "7",
          name: "CHINO SHORTS",
          size: "34",
          color: "Khaki",
          price: 32.99,
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
    },
  ];

  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "shipped":
        return <Truck className="w-4 h-4 text-blue-600" />;
      case "processing":
        return <Package className="w-4 h-4 text-orange-600" />;
      default:
        return <MoreHorizontal className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "text-green-600 bg-green-50";
      case "shipped":
        return "text-blue-600 bg-blue-50";
      case "processing":
        return "text-orange-600 bg-orange-50";
      case "cancelled":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen ">
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className=" rounded-lg shadow-sm">
          <div className="p-6 border-b ">
            <h2 className="text-2xl font-semibold ">Order History</h2>
            <p className=" mt-1">
              View and track your recent orders
            </p>
          </div>

          <div className="divide-y divide-gray-200">
            {mockOrders.map((order) => (
              <div key={order.id} className="p-6">
                {/* Order Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="font-semibold ">
                        Order #{order.id}
                      </p>
                      <p className="text-sm ">
                        {formatDate(order.date)}
                      </p>
                    </div>
                    <div
                      className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {getStatusIcon(order.status)}
                      <span className="capitalize">{order.status}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-semibold ">
                        ${order.total.toFixed(2)}
                      </p>
                      <p className="text-sm ">
                        {order.items.length} items
                      </p>
                    </div>
                    <button
                      onClick={() => toggleOrderExpansion(order.id)}
                      className="p-2  rounded-full transition-colors"
                    >
                      {expandedOrders.includes(order.id) ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Tracking Info */}
                {order.trackingNumber && (
                  <div className="mb-4 p-3  rounded-lg">
                    <p className="text-sm ">
                      Tracking Number:{" "}
                      <span className="font-mono font-medium">
                        {order.trackingNumber}
                      </span>
                    </p>
                  </div>
                )}

                {/* Order Details (Expandable) */}
                {expandedOrders.includes(order.id) && (
                  <div className="mt-4 space-y-4">
                    {/* Items */}
                    <div>
                      <h4 className="font-medium  mb-3">
                        Items Ordered
                      </h4>
                      <div className="space-y-3">
                        {order.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center space-x-4 p-3  rounded-lg"
                          >
                            <div className="w-16 h-16  rounded-lg flex items-center justify-center">
                              <Package className="w-6 h-6 " />
                            </div>
                            <div className="flex-1">
                              <h5 className="font-medium ">
                                {item.name}
                              </h5>
                              <p className="text-sm ">
                                Size: {item.size} • Color: {item.color} • Qty:{" "}
                                {item.quantity}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium ">
                                ${item.price.toFixed(2)}
                              </p>
                              {item.quantity > 1 && (
                                <p className="text-sm ">each</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Shipping Address */}
                    <div>
                      <h4 className="font-medium mb-3">
                        Shipping Address
                      </h4>
                      <div className="p-3  rounded-lg">
                        <p className="font-medium ">
                          {order.shippingAddress.name}
                        </p>
                        <p className="text-sm ">
                          {order.shippingAddress.address}
                        </p>
                        <p className="text-sm ">
                          {order.shippingAddress.city}
                        </p>
                        <p className="text-sm ">
                          {order.shippingAddress.country}
                        </p>
                      </div>
                    </div>

                    {/* Order Summary */}
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center">
                        <p className="text-sm ">Subtotal</p>
                        <p className="text-sm ">
                          ${(order.total - 5).toFixed(2)}
                        </p>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <p className="text-sm ">Shipping</p>
                        <p className="text-sm ">$5.00</p>
                      </div>
                      <div className="flex justify-between items-center mt-2 pt-2 border-t">
                        <p className="font-semibold ">Total</p>
                        <p className="font-semibold ">
                          ${order.total.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    {/* <div className="flex space-x-3 pt-4">
                      {order.status === "delivered" && (
                        <button className="px-4 py-2 bg-black text-white text-sm font-medium rounded hover:bg-gray-800 transition-colors">
                          Reorder
                        </button>
                      )}
                      {order.status === "shipped" && (
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded hover:bg-gray-50 transition-colors">
                          Track Package
                        </button>
                      )}
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded hover:bg-gray-50 transition-colors">
                        View Invoice
                      </button>
                    </div> */}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
