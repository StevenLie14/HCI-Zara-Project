import axios, {type AxiosInstance} from "axios";
import {getProjectEnvVariables} from "src/utils/env.ts";

export abstract class BaseService {
  private static axiosInstance : AxiosInstance

  protected static axios = () : AxiosInstance => {
    if (BaseService.axiosInstance == null) {
      BaseService.axiosInstance = axios.create({
        baseURL : getProjectEnvVariables().VITE_BACKEND_URL,
        headers : {
          "Content-Type" : "application/json",
        },
        withCredentials: true,
      })

      BaseService.axiosInstance.interceptors.response.use(
        response => response,
        error => {
          if (error.response?.status === 401) {
            localStorage.removeItem("accessToken");
            window.location.href = "/login";
          }
          return Promise.reject(error);
        }
      );
    }
    return BaseService.axiosInstance
  }
}