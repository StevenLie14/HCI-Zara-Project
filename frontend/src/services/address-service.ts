import {BaseService} from "@/services/base-service.ts";
import type {AddressResponse} from "@/models/dto/response/address-response.ts";
import type {AddressRequest} from "@/models/dto/request/user/create-or-update-address-request.ts";

export class AddressService extends BaseService {
  private static url = "/api/v1/address";

  public static getAddresses = async (): Promise<AddressResponse[]> => {
    return this.get<AddressResponse[]>(
      `${this.url}`,
      "Get Addresses Failed",
    );
  }

  public static createAddress = async (address: AddressRequest): Promise<AddressResponse> => {
    return this.post<AddressResponse>(
      `${this.url}`,
      "Create Address Failed",
      address,
    );
  }

  public static updateAddress = async (id : string,address: AddressRequest): Promise<AddressResponse> => {
    return this.put<AddressResponse>(
      `${this.url}/${id}`,
      "Update Address Failed",
      address,
    );
  }

  public static deleteAddress = async (id : string): Promise<AddressResponse> => {
    return this.delete<AddressResponse>(
      `${this.url}/${id}`,
      "Delete Address Failed",
    );
  }
}