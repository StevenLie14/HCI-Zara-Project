import axios, {type AxiosInstance} from "axios";

export abstract class BaseService {
  private static axiosInstance : AxiosInstance

  protected static axios = () : AxiosInstance => {
    if (BaseService.axiosInstance == null) {
      BaseService.axiosInstance = axios.create({
        // baseURL : getProjectEnvVariables().envVariables.VITE_BACKEND_URL,
        baseURL : "http://localhost:6789",
        headers : {
          "Content-Type" : "application/json",
        },
        withCredentials: true,
      })

      // BaseService.axiosInstance.interceptors.request.use((config) => {
      //   const token = localStorage.getItem("accessToken");
      //   if (token) {
      //     config.headers.Authorization = `Bearer ${token}`;
      //   }
      //   return config;
      // });

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