import axios, {AxiosHeaders, type AxiosInstance, type AxiosResponse} from "axios";
import { getProjectEnvVariables } from "src/utils/env.ts";

export abstract class BaseService {
  private static axiosInstance: AxiosInstance;

  protected static axios = (): AxiosInstance => {
    if (BaseService.axiosInstance == null) {
      BaseService.axiosInstance = axios.create({
        baseURL: getProjectEnvVariables().VITE_BACKEND_URL,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    }
    return BaseService.axiosInstance;
  };

  private static request = async <T>(
    callback: () => Promise<AxiosResponse<T>>,
    fallback: string,
  ): Promise<T> => {
    try {
      const response = await callback();
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data || fallback;
        throw new Error(typeof message === "string" ? message : fallback);
      }
      throw new Error("An unexpected error occurred.");
    }
  };

  protected static get = async <T>(
    url: string,
    fallback: string,
  ): Promise<T> => {
    return this.request(() => BaseService.axios().get<T>(url), fallback);
  };

  protected static post = async <T>(
    url: string,
    fallback: string,
    data?: unknown,
    headers?: AxiosHeaders,
  ): Promise<T> => {
    return this.request(() => BaseService.axios().post<T>(url, data, {headers: headers}), fallback);
  };

  protected static put = async <T>(
    url: string,
    data: unknown,
    fallback: string,
    headers?: AxiosHeaders,
  ): Promise<T> => {
    return this.request(() => BaseService.axios().put<T>(url, data, {headers: headers}), fallback);
  };

  protected static delete = async <T>(
    url: string,
    fallback: string,
  ): Promise<T> => {
    return this.request(() => BaseService.axios().delete<T>(url), fallback);
  };

  protected static patch = async <T>(
    url: string,
    data: unknown,
    fallback: string,
    headers?: AxiosHeaders,
  ): Promise<T> => {
    return this.request(
      () => BaseService.axios().patch<T>(url, data, {headers: headers}),
      fallback,
    );
  };
}
