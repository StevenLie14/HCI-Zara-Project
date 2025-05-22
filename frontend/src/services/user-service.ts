import {BaseService} from "./base-service.ts";
import type {ResetPasswordRequest} from "@/models/dto/request/auth/reset-password-request.ts";

export class UserService extends BaseService {
  private static url = "/api/v1/users"

  public static changePassword = async (req : ResetPasswordRequest) : Promise<void> => {
    return this.patch<void>(this.url+"/change-password", req, "Failed to change password")
  }




}