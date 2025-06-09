import { ToastService } from "@/utils/toast.ts";
import { type UseMutationResult, useMutation } from "@tanstack/react-query";
import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import type {ProductResponse} from "@/models/dto/response/product-response.ts";
import {mockProducts} from "@/models/constant/products.ts";
import {ProductService} from "@/services/product-service.ts";

interface ProductContextProps {
  getProducts: UseMutationResult<ProductResponse[], Error, void>;
  products : ProductResponse[];
  searchProduct : (query: string) => void;
}

interface ProductProps {
  children: ReactNode;
}

export const ProductContext = createContext<ProductContextProps>(
  {} as ProductContextProps,
);

export function ProductProvider({ children }: ProductProps) {

  const [products, setProducts] = useState<ProductResponse[]>(mockProducts);
  const [allProducts, setAllProducts] = useState<ProductResponse[]>(mockProducts)
  const searchProduct = (query: string) => {
    setProducts(allProducts.filter((product) => {
      return product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
    }))
  }


  const getProducts = useMutation({
    mutationFn: ProductService.getAllProduct,
    onSuccess: (resp) => {
      setProducts([...resp,...mockProducts]);
      setAllProducts([...resp,...mockProducts]);
    },
    onError: () => {
      ToastService.error("Failed to fetch products");
    },
  });


  useEffect(() => {
    getProducts.mutate();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        getProducts: getProducts,
        products: products,
        searchProduct: searchProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export const useProduct = () => useContext(ProductContext);
