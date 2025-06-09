import React, {useEffect, useState} from "react";
import AdminOrderCard from "./order-management/order-card";
import type {TransactionResponse} from "@/models/dto/response/transaction-response.ts";
import {useMutation} from "@tanstack/react-query";
import {TransactionService} from "@/services/transaction-service.ts";
import {ToastService} from "@/utils/toast.ts";

const AdminOrderManagement: React.FC = () => {
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

  const updateStatusMutation = useMutation({
    mutationFn: TransactionService.updateTransaction,
    onSuccess: () => {
      ToastService.success("Order status updated successfully");
      transactionMutation.mutate();
    },
    onError: (error) => {
      ToastService.error(error.message);
    },
  })

  useEffect(() => {
    transactionMutation.mutate()
  }, [updateStatusMutation.status]);

  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };


  return (
    <div className="min-h-screen ">

      <div className="max-w-7xl mx-auto px-4 py-8">

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
            {transactions.map((order) => (
              <AdminOrderCard
                updateMutation={updateStatusMutation}
                key={order.id}
                order={order}
                isExpanded={expandedOrders.includes(order.id)}
                onToggleExpansion={() => toggleOrderExpansion(order.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderManagement;
