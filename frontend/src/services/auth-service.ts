import type { AuthRequest } from "@/models/dto/request/auth/auth-request.ts";
import type { RegisterRequest } from "@/models/dto/request/auth/register-request.ts";
import type { GetCodeResponse } from "@/models/dto/response/get-code-response.ts";
import type { UserResponse } from "@/models/dto/response/user-response.ts";
import type { AuthResponse } from "src/models/dto/response/auth-response.ts";
import { BaseService } from "./base-service.ts";

export class AuthService extends BaseService {
  private static url = "/api/v1/auth";

  public static login = async (request: AuthRequest): Promise<AuthResponse> => {
    return this.post<AuthResponse>(
      `${this.url}/login`,
      "Login Failed",
      request,
    );
  };

  public static register = async (
    request: RegisterRequest,
  ): Promise<AuthResponse> => {
    return this.post<AuthResponse>(
      `${this.url}/register`,
      "Register Failed",
      request,
    );
  };

  public static me = async () => {
    return this.get<UserResponse>(this.url, "Not Authenticated");
  };

  public static logout = async () => {
    return this.post<AuthResponse>(`${this.url}/logout`, "Not Authenticated");
  };

  public static getResetPasswordOtp = async (
    email: string,
  ): Promise<GetCodeResponse> => {
    return this.get<GetCodeResponse>(
      `${this.url}/reset/${email}`,
      "Failed to send reset password OTP",
    );
  };

  public static getRegisterOtp = async (
    email: string,
  ): Promise<GetCodeResponse> => {
    return this.get<GetCodeResponse>(
      `${this.url}/register/${email}`,
      "Failed to get OTP",
    );
  };
}
