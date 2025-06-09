import {useEffect, useState} from "react";
import {
  ChevronDown,
  ChevronUp,
  Package,
  Truck,
  CheckCircle,
  MoreHorizontal,
} from "lucide-react";
import type {TransactionResponse} from "@/models/dto/response/transaction-response.ts";
import {useMutation} from "@tanstack/react-query";
import {ToastService} from "@/utils/toast.ts";
import {TransactionService} from "@/services/transaction-service.ts";

const OrderHistory = () => {
  const [expandedOrders, setExpandedOrders] = useState<string[]>([]);

  const [transactions, setTransactions] = useState<TransactionResponse[]>([]);
  const transactionMutation = useMutation({
    mutationFn: TransactionService.getMyTransactions,
    onSuccess: (data) => {
      setTransactions(data);
    },
    onError: (error) => {
      ToastService.error(error.message);
    },
  })

  useEffect(() => {
    transactionMutation.mutate()
  }, []);

  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "DELIVERED":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "SHIPPED":
        return <Truck className="w-4 h-4 text-blue-600" />;
      case "PENDING":
        return <Package className="w-4 h-4 text-orange-600" />;
      default:
        return <MoreHorizontal className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "DELIVERED":
        return "text-green-600 bg-green-50";
      case "SHIPPED":
        return "text-blue-600 bg-blue-50";
      case "PENDING":
        return "text-orange-600 bg-orange-50";
      case "CANCELLED":
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
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className=" rounded-lg shadow-sm">
          <div className="p-6 border-b ">
            <h2 className="text-2xl font-semibold ">Order History</h2>
            <p className=" mt-1">
              View and track your recent orders
            </p>
          </div>

          <div className="divide-y divide-gray-200">
            {transactions.map((order) => (
              <div key={order.id} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="font-semibold ">
                        Order #{order.id}
                      </p>
                      <p className="text-sm ">
                        {formatDate(order.createdAt)}
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
                        ${order.items.reduce((total, item) => total + item.variant.price * item.quantity, 0).toFixed(2)}
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
                                {item.product?.name}
                              </h5>
                              <p className="text-sm ">
                                Size: {item.variant.size} • Color: {item.variant.color} • Qty:{" "}
                                {item.quantity}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium ">
                                ${item.variant.price.toFixed(2)}
                              </p>
                              {item.quantity > 1 && (
                                <p className="text-sm ">each</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">
                        Shipping Address
                      </h4>
                      <div className="p-3  rounded-lg">
                        <p className="font-medium ">
                          {order.address.name}
                        </p>
                        <p className="text-sm ">
                          {order.address.address}
                        </p>
                        <p className="text-sm ">
                          {order.address.city}
                        </p>
                        <p className="text-sm ">
                          {order.address.country}
                        </p>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center">
                        <p className="text-sm ">Subtotal</p>
                        <p className="text-sm ">
                          ${order.items.reduce((total, item) => total + item.variant.price * item.quantity, 0).toFixed(2)}
                        </p>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <p className="text-sm ">Shipping</p>
                        <p className="text-sm ">Free</p>
                      </div>
                      <div className="flex justify-between items-center mt-2 pt-2 border-t">
                        <p className="font-semibold ">Total</p>
                        <p className="font-semibold ">
                          ${order.items.reduce((total, item) => total + item.variant.price * item.quantity, 0).toFixed(2)}
                        </p>
                      </div>
                    </div>
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
