import {z} from "zod";

const addressSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  street: z.string().min(5, { message: "Please enter a valid street address" }),
  city: z.string().min(2, { message: "City is required" }),
  state: z.string().min(2, { message: "State is required" }),
  zipCode: z.string().min(3, { message: "Zip code is required" }),
  country: z.string().min(2, { message: "Country is required" }),
})

export type AddressRequest = z.infer<typeof addressSchema>;