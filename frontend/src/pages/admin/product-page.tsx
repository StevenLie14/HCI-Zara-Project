import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ProductForm from "@/components/product/product-form.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useEffect, useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {ProductService} from "@/services/product-service.ts";
import type {ProductResponse} from "@/models/dto/response/product-response.ts";
import {ToastService} from "@/utils/toast.ts";
import {ProductList} from "@/components/product/product-list.tsx";
import type {Nullable} from "@/models/types/utils";

const ProductPage = () => {
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [products, setProducts] = useState<ProductResponse[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Nullable<ProductResponse>>(null)

  const productMutation = useMutation({
    mutationFn: ProductService.getAllProduct,
    onSuccess: (data) => {
      setProducts(data)
    },
    onError: (error) => {
      ToastService.error(error.message)
    },
  })

  const handleProductUpdate = (product: ProductResponse) => {
    setSelectedProduct(product)
    setShowAddProduct(true)
  }

  useEffect(() => {
    productMutation.mutate()
  },[])

  const showModal = () => {
    setSelectedProduct(null)
    setShowAddProduct(true)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Product Management
            <Button
              onClick={showModal}
            >
              Add Product
            </Button>
          </CardTitle>
          <CardDescription>Manage your product catalog and inventory</CardDescription>
        </CardHeader>
        <CardContent>
          <ProductList products={products} onEditProduct={handleProductUpdate} />
        </CardContent>
      </Card>
      <ProductForm open={showAddProduct} onClose={() => setShowAddProduct(false)} getProducts={productMutation} selectedProduct={selectedProduct} />
    </div>

  )
}

export default ProductPage
