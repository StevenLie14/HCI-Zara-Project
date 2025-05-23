import type { UserResponse } from "@/models/dto/response/user-response.ts";

export interface AuthResponse {
  token: string;
  user: UserResponse;
}
