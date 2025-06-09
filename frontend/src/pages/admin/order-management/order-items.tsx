import {
  Package,
} from "lucide-react";
import type {TransactionItemResponse} from "@/models/dto/response/transaction-item-response.ts";

interface IProps {
  item: TransactionItemResponse;
}

const OrderItemComponent = ({item} : IProps) => (
  <div className="flex items-center space-x-4 p-3  rounded-lg">
    <div className="w-16 h-16  rounded-lg flex items-center justify-center">
      <Package className="w-6 h-6 " />
    </div>
    <div className="flex-1">
      <h5 className="font-medium ">{item.product.name}</h5>
      <p className="text-sm ">
        Size: {item.variant.size} • Color: {item.variant.color} • Qty: {item.quantity}
      </p>
    </div>
    <div className="text-right">
      <p className="font-medium ">${item.price.toFixed(2)}</p>
      {item.quantity > 1 && <p className="text-sm ">each</p>}
    </div>
  </div>
);

export default OrderItemComponent;
