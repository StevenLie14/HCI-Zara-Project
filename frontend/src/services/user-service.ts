import type { ResetPasswordRequest } from "@/models/dto/request/auth/reset-password-request.ts";
import { BaseService } from "./base-service.ts";
import {AxiosHeaders} from "axios";
import type {ProfileRequest} from "@/models/dto/request/user/update-user-request.ts";

export class UserService extends BaseService {
  private static url = "/api/v1/users";

  public static changePassword = async (
    req: ResetPasswordRequest,
  ): Promise<void> => {
    return this.patch<void>(
      `${this.url}/change-password`,
      req,
      "Failed to change password",
    );
  };

  public static updateProfilePicture = async (file : FormData): Promise<void> => {
    return this.patch<void>(
      `${this.url}/profile`,
      file,
      "Failed to update profile",
      AxiosHeaders.from(
        {"Content-Type": "multipart/form-data"}
      )
    );
  }

  public static updateProfileData = async (req : ProfileRequest): Promise<string> => {
    return this.put<string>(
      `${this.url}`,
      req,
      "Failed to update profile",
    )
  }
}
