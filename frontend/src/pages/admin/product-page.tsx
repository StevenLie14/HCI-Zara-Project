import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ProductForm from "@/components/product/product-form.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useState} from "react";

const ProductPage = () => {
  const [showAddProduct, setShowAddProduct] = useState(false)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Product Management
            <Button
              onClick={() => setShowAddProduct(true)}
            >
              Add Product
            </Button>
          </CardTitle>
          <CardDescription>Manage your product catalog and inventory</CardDescription>
        </CardHeader>
        <CardContent>
        </CardContent>
      </Card>
      <ProductForm open={showAddProduct} onClose={() => setShowAddProduct(false)} />
    </div>

  )
}

export default ProductPage
