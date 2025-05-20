import {BaseService} from "./base-service.ts";
import type {AxiosResponse} from "axios";
import type {AuthRequest} from "src/models/dto/request/auth-request.ts";
import type {AuthResponse} from "src/models/dto/response/auth-response.ts";

export class AuthService extends BaseService {
  private static url = "/api/v1/auth"
  public static login = async (request : AuthRequest) => {
    const response: AxiosResponse<AuthResponse> = await AuthService.axios().post(AuthService.url+"/login",request)
    if (response.data.token) {
      localStorage.setItem("accessToken", response.data.token);
    }
    return response.data
  }


}