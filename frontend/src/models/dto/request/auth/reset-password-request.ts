import {z} from "zod";

export const resetPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  verificationCode: z.string().length(6, { message: "OTP code must be 6 digits" }).optional(),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

export type ResetPasswordRequest = z.infer<typeof resetPasswordSchema>