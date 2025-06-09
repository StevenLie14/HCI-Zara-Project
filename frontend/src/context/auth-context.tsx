import type { AuthRequest } from "@/models/dto/request/auth/auth-request.ts";
import type { RegisterRequest } from "@/models/dto/request/auth/register-request.ts";
import type { AuthResponse } from "@/models/dto/response/auth-response.ts";
import type { UserResponse } from "@/models/dto/response/user-response.ts";
import type { Nullable } from "@/models/types/utils";
import { AuthService } from "@/services/auth-service.ts";
import { ToastService } from "@/utils/toast.ts";
import { type UseMutationResult, useMutation } from "@tanstack/react-query";
import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import type {ProductResponse} from "@/models/dto/response/product-response.ts";
import {mockProducts} from "@/models/constant/products.ts";

interface AuthContextProps {
  me: UserResponse | null;
  isAuthenticated: Boolean | null;
  login: UseMutationResult<AuthResponse, Error, AuthRequest>;
  logout: UseMutationResult<AuthResponse, Error, void>;
  getMe: UseMutationResult<UserResponse, Error, void>;
  register: UseMutationResult<AuthResponse, Error, RegisterRequest>;
  products : ProductResponse[];
  searchProduct : (query: string) => void;
}

interface AuthProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps,
);

export function AuthProvider({ children }: AuthProps) {
  const [user, setUser] = useState<Nullable<UserResponse>>(null);
  const [isAuthenticated, setIsAuthenticated] =
    useState<Nullable<Boolean>>(null);
  const navigate = useNavigate();
  const [products, setProducts] = useState<ProductResponse[]>(mockProducts);
  const searchProduct = (query: string) => {
    setProducts(mockProducts.filter((product) => {
      return product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
    }))
  }

  const login = useMutation({
    mutationFn: AuthService.login,
    onSuccess: () => {
      ToastService.success("Login successful");
      navigate("/");
    },
    onError: (error) => {
      ToastService.error(error.message);
    },
  });

  const logout = useMutation({
    mutationFn: AuthService.logout,
    onSuccess: () => {
      ToastService.success("Logout successful");
      setUser(null);
      setIsAuthenticated(false);
      navigate("/login");
    },
    onError: (error) => {
      ToastService.error(error.message);
    },
  });

  const getCurrentUser = useMutation({
    mutationFn: AuthService.me,
    onSuccess: (resp) => {
      setUser(resp);
      setIsAuthenticated(true);
    },
    onError: () => {
      setUser(null);
      setIsAuthenticated(false);
      console.log("User not authenticated");
    },
  });

  const register = useMutation({
    mutationFn: AuthService.register,
    onSuccess: () => {
      ToastService.success("Registration successful");
      navigate("/");
    },
    onError: (error) => {
      ToastService.error(error.message);
    },
  });

  useEffect(() => {
    getCurrentUser.mutate();
  }, [register.status, login.status, logout.status]);

  return (
    <AuthContext.Provider
      value={{
        me: user,
        login: login,
        logout: logout,
        register: register,
        getMe: getCurrentUser,
        isAuthenticated: isAuthenticated,
        products: products,
        searchProduct: searchProduct,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
