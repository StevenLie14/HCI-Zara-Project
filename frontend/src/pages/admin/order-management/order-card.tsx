import React from "react";
import {
  ChevronDown,
  ChevronUp,
  User,
  Calendar,
} from "lucide-react";
import AdminStatusBadge from "./admin-status-badge";
import OrderItemComponent from "./order-items";
import type {TransactionResponse} from "@/models/dto/response/transaction-response.ts";
import type {UserResponse} from "@/models/dto/response/user-response.ts";
import type {UseMutationResult} from "@tanstack/react-query";
import type {UpdateTransactionRequest} from "@/models/dto/request/transaction/update-transaction-request.ts";

interface CustomerInfoProps {
  customer: UserResponse;
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
  order: TransactionResponse;
  isExpanded: boolean;
  onToggleExpansion: () => void;
  updateMutation: UseMutationResult<TransactionResponse, Error, UpdateTransactionRequest>
}

const AdminOrderCard: React.FC<AdminOrderCardProps> = ({
  order,
  isExpanded,
  onToggleExpansion,
  updateMutation,
}) => {

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const onStatusChange = (id: string, status : string) => {
    const updateRequest: UpdateTransactionRequest = {
      id: id,
      status: status,
    }
    updateMutation.mutate(updateRequest);
  }


  return (
    <div className="p-4  transition-colors">
      <div className="p-2 transition-colors">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <p className="text-md">{formatDate(order.createdAt)}</p>
            </div>

            <div>
              <p className="font-medium">Customer: {order.user.name}</p>
              <p className="font-medium">Payment: {order.paymentMethod}</p>
            </div>
          </div>

          <div className="space-y-2 text-right">
            <div>
              <AdminStatusBadge
                id={order.id}
                status={order.status}
                onStatusChange={onStatusChange}
              />
            </div>

            <div className="flex items-center space-x-4 justify-end">
              <div>
                <p className="font-semibold">
                  $
                  {order.items
                    .reduce((total, item) => total + item.variant.price * item.quantity, 0)
                    .toFixed(2)}
                </p>
                <p className="text-sm">{order.items.length} items</p>
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
        </div>
      </div>

      {isExpanded && (
        <div className="mt-6 space-y-6">
          <CustomerInfo customer={order.user} />
          <div>
            <h4 className="font-medium mb-3">Items Ordered</h4>
            <div className="space-y-3">
              {order.items.map((item) => (
                <OrderItemComponent key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrderCard;