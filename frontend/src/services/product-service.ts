import type { CreateProductRequest } from "@/models/dto/request/create-product.ts";
import { BaseService } from "./base-service.ts";
import {AxiosHeaders} from "axios";
import type {ProductResponse} from "@/models/dto/response/product-response.ts";

export class ProductService extends BaseService {
  private static url = "/api/v1/products";

  public static getAllProduct = async () : Promise<ProductResponse[]> => {
    return this.get(this.url, "Get All Products Failed");
  };

  public static createProduct = async (productRequest: CreateProductRequest) : Promise<ProductResponse> => {
    const formData = new FormData();
    const productData = {
      name: productRequest.name,
      description: productRequest.description,
      categoryId: productRequest.categoryId,
      variants: productRequest.variants.map(({ imageFile, ...rest }) => rest),
      images: productRequest.images.map(({ imageFile, ...rest }) => rest),
    };
    console.log("Product data to be sent:", productData);
    formData.append(
      "product",
      new Blob([JSON.stringify(productData)], {
        type: "application/json",
      }),
    );
    productRequest.images.forEach((image) => {
      if (image.imageFile instanceof File) {
        formData.append("productImages", image.imageFile);
      }
    });
    productRequest.variants.forEach((variant) => {
      if (variant.imageFile instanceof File) {
        formData.append("variantImages", variant.imageFile);
      }
    });

    return this.post(this.url, "Create Product Failed", formData, AxiosHeaders.from({
      "Content-Type": "multipart/form-data",
    }))
  }

  public static updateProduct = async (productRequest: CreateProductRequest) : Promise<ProductResponse> => {
    const formData = new FormData();
    const productData = {
      id: productRequest.id,
      name: productRequest.name,
      description: productRequest.description,
      categoryId: productRequest.categoryId,
      variants: productRequest.variants.map(({ imageFile, ...rest }) => rest),
      images: productRequest.images.map(({ imageFile, ...rest }) => rest),
    };
    console.log("Product data to be sent:", productData);
    formData.append(
      "product",
      new Blob([JSON.stringify(productData)], {
        type: "application/json",
      }),
    );
    productRequest.images.forEach((image) => {
      if (image.imageFile instanceof File) {
        formData.append("productImages", image.imageFile);
      }
    });
    productRequest.variants.forEach((variant) => {
      if (variant.imageFile instanceof File) {
        formData.append("variantImages", variant.imageFile);
      }
    });

    return this.put(this.url, "Update Product Failed", formData, AxiosHeaders.from({
      "Content-Type": "multipart/form-data",
    }))
  }


}
