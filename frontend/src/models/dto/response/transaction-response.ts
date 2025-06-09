import type {UserResponse} from "@/models/dto/response/user-response.ts";
import type {AddressResponse} from "@/models/dto/response/address-response.ts";
import type {TransactionItemResponse} from "@/models/dto/response/transaction-item-response.ts";

export interface TransactionResponse {
  id: string,
  user : UserResponse
  address : AddressResponse,
  paymentMethod : string,
  status : string,
  items : TransactionItemResponse[],
  createdAt: string,
}