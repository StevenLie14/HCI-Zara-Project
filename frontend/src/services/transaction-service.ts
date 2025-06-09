import {BaseService} from "@/services/base-service.ts";
import type {TransactionResponse} from "@/models/dto/response/transaction-response.ts";
import type {CreateTransactionRequest} from "@/models/dto/request/transaction/create-transaction-request.ts";
import type {UpdateTransactionRequest} from "@/models/dto/request/transaction/update-transaction-request.ts";

export class TransactionService extends BaseService {
  private static url = "/api/v1/transactions";

  public static getMyTransactions = async (): Promise<TransactionResponse[]> => {
    return this.get(this.url, "Get All Transactions Failed");
  }

  public static createTransaction = async (req: CreateTransactionRequest): Promise<TransactionResponse> => {
    return this.post(this.url, "Create Transaction Failed", req);
  }

  public static updateTransaction = async (req: UpdateTransactionRequest): Promise<TransactionResponse> => {
    return this.put(`${this.url}/${req.id}`, "Update Transaction Failed", req);
  }
}