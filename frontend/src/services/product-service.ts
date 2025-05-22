import {BaseService} from "./base-service.ts";
import type {CreateProductRequest} from "@/models/dto/request/create-product.ts";

export class ProductService extends BaseService {
  private static url = "/api/v1/products"
  public static getAllProduct = async () => {
    const response = await ProductService.axios()
      .get(ProductService.url)
    return response.data
  }

  public static createProduct = async (productRequest : CreateProductRequest ) => {
    const formData = new FormData()
    const productData = {
      name: productRequest.name,
      description: productRequest.description,
      categoryId : productRequest.categoryId,
      variants: productRequest.variants.map(({ imageFile, ...rest }) => rest),
      images : productRequest.images.map(({ imageFile, ...rest }) => rest),
    };
    formData.append("product",
      new Blob([JSON.stringify(productData)], {
      type: "application/json",
    }))
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
    const response = await ProductService.axios()
      .post(ProductService.url, formData, {headers : {"Content-Type": "multipart/form-data"}})
    return response.data
  }


}