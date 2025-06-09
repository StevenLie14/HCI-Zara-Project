import { Link } from "react-router-dom"
import {Button} from "@/components/ui/button.tsx";

interface ProductCardProps {
  product: Product
  showAddToCart?: boolean
}

export default function ProductCard({ product, showAddToCart = true }: ProductCardProps) {

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    // addItem(product)
  }

  return (
    <div className="group relative">
      <Link to={`/product/${product.id}`}>
        <div className="aspect-[3/4] w-full overflow-hidden rounded-lg bg-gray-200">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity"
          />
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700 dark:text-gray-300">
              <span aria-hidden="true" className="absolute inset-0" />
              {product.name}
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{product.category}</p>
          </div>
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">${product.price}</p>
        </div>
      </Link>
      {showAddToCart && (
        <Button
          onClick={handleAddToCart}
          className="mt-3 w-full bg-slate-700 hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600"
        >
          Add to Cart
        </Button>
      )}
    </div>
  )
}
