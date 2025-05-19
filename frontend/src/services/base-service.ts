import axios, {type AxiosInstance} from "axios";
import {getProjectEnvVariables} from "src/utils/env.ts";

export abstract class BaseService {
  private static axiosInstance : AxiosInstance

  protected static axios = () : AxiosInstance => {
    if (BaseService.axiosInstance == null) {
      BaseService.axiosInstance = axios.create({
        baseURL : getProjectEnvVariables().envVariables.VITE_BACKEND_URL,
        withCredentials: true
      })
    }
    return BaseService.axiosInstance
  }

}