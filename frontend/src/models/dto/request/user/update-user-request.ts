import {z} from "zod";

export const profileSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(5, { message: "Please enter a valid phone number" }),
  gender: z.string().optional(),
  birthDate: z.string().optional(),
  verificationDate: z.string().optional(),
})

export type ProfileRequest = z.infer<typeof profileSchema>;