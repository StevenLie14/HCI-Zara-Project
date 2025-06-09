import {z} from "zod";

export const updateTransactionSchema = z.object({
  id: z.string(),
  status : z.string().min(1, "Status is required"),
});

export type UpdateTransactionRequest = z.infer<typeof updateTransactionSchema>;