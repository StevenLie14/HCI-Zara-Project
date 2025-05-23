import {z} from "zod";

export const addressSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  address: z.string().min(5, { message: "Please enter a valid address" }),
  city: z.string().min(2, { message: "City is required" }),
  province: z.string().min(2, { message: "Province is required" }),
  country: z.string().min(2, { message: "Country is required" }),
  postalCode: z.string().min(3, { message: "Postal code is required" }),
})

export type AddressRequest = z.infer<typeof addressSchema>;