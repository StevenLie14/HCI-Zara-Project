import { ToastService } from "@/utils/toast.ts";
import { type UseMutationResult, useMutation } from "@tanstack/react-query";
import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import type {CartResponse} from "@/models/dto/response/cart-response.ts";
import {CartService} from "@/services/cart-service.ts";
import type {UpdateCartRequest} from "@/models/dto/request/cart/update-cart-request.ts";

interface CartContextProps {
  getCarts: UseMutationResult<CartResponse[], Error, void>;
  updateCart: UseMutationResult<CartResponse, Error, UpdateCartRequest>;
  deleteCart: UseMutationResult<void, Error, string>;
  deleteAllCarts: UseMutationResult<void, Error, void>;
  carts : CartResponse[];
}

interface CartProps {
  children: ReactNode;
}

export const CartContext = createContext<CartContextProps>(
  {} as CartContextProps,
);

export function CartProvider({ children }: CartProps) {

  const [carts, setCarts] = useState<CartResponse[]>([]);


  const getCarts = useMutation({
    mutationFn: CartService.getMyCarts,
    onSuccess: (resp) => {
      setCarts(resp);
    },
    onError: () => {
      ToastService.error("Failed to fetch products");
    },
  });

  const updateCart = useMutation({
    mutationFn: CartService.updateCart,
    onError: () => {
      ToastService.error("Failed to update cart");
    },
  });

  const deleteCart = useMutation({
    mutationFn: CartService.deleteCart,
    onSuccess: () => {
      ToastService.success("Cart deleted successfully");
      getCarts.mutate();
    },
    onError: () => {
      ToastService.error("Failed to delete cart");
    },
  });

  const deleteAllCarts = useMutation({
    mutationFn: CartService.deleteAllCarts,
    onSuccess: () => {
      ToastService.success("All carts deleted successfully");
      getCarts.mutate();
    },
    onError: () => {
      ToastService.error("Failed to delete all carts");
    },
  });


  useEffect(() => {
    getCarts.mutate();
  }, [deleteAllCarts.status, deleteCart.status, updateCart.status,window.location.href]);

  return (
    <CartContext.Provider
      value={{
        getCarts: getCarts,
        carts: carts,
        updateCart: updateCart,
        deleteCart: deleteCart,
        deleteAllCarts: deleteAllCarts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCarts = () => useContext(CartContext);
