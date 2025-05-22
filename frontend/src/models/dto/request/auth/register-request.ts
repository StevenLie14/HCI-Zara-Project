import {z} from "zod";

export const registerSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  verificationCode: z.string().length(6, { message: "OTP code must be 6 digits" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  agreeToTerms: z.boolean().refine(val => val, {
    message: "You must agree to the terms and privacy policy",
  }),
})

export type RegisterRequest = z.infer<typeof registerSchema>