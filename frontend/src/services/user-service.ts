import {BaseService} from "./base-service.ts";
import type {AxiosResponse} from "axios";
import type {UserResponse} from "../models/dto/response/user-response.ts";
import type {UserRequest} from "../models/dto/request/user-request.ts";

export class UserService extends BaseService {
  private static url = "/api/v1/users"
  public static createUser = async (request : UserRequest) => {
    const response: AxiosResponse<UserResponse> = await UserService.axios().post(UserService.url+"/",request)
    return response.data
  }


}