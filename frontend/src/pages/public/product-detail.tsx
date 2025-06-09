import {useEffect, useState} from "react"
import {useParams, Link, useNavigate} from "react-router-dom"
import { ArrowLeft, Truck, RotateCcw, Leaf, Minus, Plus, ChevronLeft, ChevronRight } from "lucide-react"
import {Select, SelectContent, SelectItem, SelectTrigger} from "@/components/ui/select.tsx";
import {SelectValue} from "@radix-ui/react-select";
import {Button} from "@/components/ui/button.tsx";
import FeaturedProducts from "@/pages/public/featured-product.tsx";
import {useMutation} from "@tanstack/react-query";
import {ToastService} from "@/utils/toast.ts";
import type {ProductResponse} from "@/models/dto/response/product-response.ts";
import {ProductService} from "@/services/product-service.ts";
import LoadingScreen from "@/components/loading-screen.tsx";
import type {ProductVariantResponse} from "@/models/dto/response/product-variant-response.ts";
import {loadImage} from "@/utils/utils.ts";
import {type CreateCartRequest} from "@/models/dto/request/cart/create-cart.ts";
import {CartService} from "@/services/cart-service.ts";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [selectedColor, setSelectedColor] = useState("")
  const [selectedSize, setSelectedSize] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [productImages, setProductImages] = useState<string[]>([])
  const [product, setProduct] = useState<ProductResponse | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariantResponse>({} as ProductVariantResponse);
  const navigate = useNavigate()

  const getProduct = useMutation({
    mutationFn : ProductService.getProductById,
    onSuccess: (data) => {
      setProduct(data)
      const productImages = data.productImages.map(image => image.productImage)
      setProductImages([...productImages])
      setSelectedVariant(data.productVariants[0] || {} as ProductVariantResponse)
      setSelectedColor(data.productVariants[0]?.color || "")
      setSelectedSize(data.productVariants[0]?.size || "")
    },
    onError: (error) => {
      ToastService.error(error.message)
      navigate('/')
    },
  })

  const handleVariantChange = (color: string, size: string) => {
    const variant = product?.productVariants.find(v => v.color === color && v.size === size)
    if (variant) {
      setSelectedSize(size)
      setSelectedVariant(variant)
      if (quantity > variant.stock) {
        setQuantity(variant.stock)
      }
    } else {
      ToastService.error("Variant not found")
    }
  }

  const handleColorChange = (color: string) => {
    const variant = product?.productVariants.find(v => v.color === color)
    if (variant) {
      setSelectedColor(color)
      setSelectedSize(variant.size)
      setSelectedVariant(variant)
      if (quantity > variant.stock) {
        setQuantity(variant.stock)
      }
    } else {
      ToastService.error("Color not found")
    }
  }


  useEffect(() => {
    if (id) {
      getProduct.mutate(id)
    }
  },[])

  const addToCart = useMutation({
    mutationFn: CartService.createCart,
    onSuccess: () => {
      ToastService.success("Product added to cart")
      navigate("/cart")
    },
    onError: (error) => {
      ToastService.error(error.message)
    },
  })

  const handleAddToCart = () => {
    console.log(selectedVariant)
    if (!product || !selectedVariant) {
      ToastService.error("Please select a product variant")
      return
    }

    if (selectedColor === "") {
      ToastService.error("Please select a color")
      return
    }

    if (selectedSize === "") {
      ToastService.error("Please select a size")
      return
    }


    if (selectedVariant.stock < quantity) {
      ToastService.error("Not enough stock available")
      return
    }

    if (quantity <= 0) {
      ToastService.error("Quantity must be greater than 0")
      return
    }

    const cartRequest: CreateCartRequest = {
      productId: product.id,
      quantity: quantity,
      variantId: selectedVariant.id,
    }

    addToCart.mutate(cartRequest)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length)
  }

  if (!product) {
    return <LoadingScreen text={"Loading..."} />
  }

  // @ts-ignore
  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Link>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
            <img
              src={loadImage(productImages[currentImageIndex]) || "/placeholder.svg"}
              alt={product.name}
              className="h-full w-full object-cover"
            />

            {productImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full dark:bg-black/80 bg-white/80 p-2 shadow-md hover:bg-white transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5"/>
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full dark:bg-black/80 bg-white/80 p-2 shadow-md hover:bg-white transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5"/>
                </button>
              </>
            )}

            {productImages.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {productImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`h-2 w-2 rounded-full transition-colors ${
                      index === currentImageIndex ? "bg-white dark:bg-black" : "bg-white/50 dark:bg-black/50"
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>


        </div>

        <div className="flex flex-col">
          <div className="mb-2 text-sm text-muted-foreground capitalize">{product.category.name}</div>
          <h1 className="mb-4 text-3xl font-bold">{product.name}</h1>
          <p className="mb-6 text-muted-foreground leading-relaxed">{product.description}</p>
          <div className="mb-6 text-2xl font-bold">${selectedVariant.price.toFixed(2)}</div>

          {product.productVariants && product.productVariants.length > 0 && (
            <div className="mb-6">
              <label className="mb-3 block text-sm font-medium">Color:</label>
              <div className="flex gap-3">
                {[...new Map(product.productVariants.map(variant => [variant.color, variant])).values()].map((variant) => (
                  <button
                    key={variant.color}
                    onClick={() => handleColorChange(variant.color)}
                    className={`relative h-8 w-8 rounded-full border-2 transition-all ${
                      selectedColor === variant.color
                        ? "border-foreground scale-110"
                        : "border-muted hover:border-foreground/50"
                    }`}
                    style={{backgroundColor: variant.color}}
                    aria-label={`Select color ${variant.color}`}
                    title={variant.color}
                  >
                    {selectedColor === variant.color && <div className="absolute inset-0 rounded-full border-2 border-white"/>}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.productVariants && product.productVariants.length > 0 && (
            <div className="mb-6">
              <label className="mb-3 block text-sm font-medium">Size:</label>
              <Select value={selectedSize} onValueChange={(e) => handleVariantChange(selectedColor, e)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={selectedColor == ""? "Select a color first": "Select size"}/>
                </SelectTrigger>
                <SelectContent>
                  {product.productVariants.filter((variant) => variant.color == selectedColor).map((variant) => (
                    <SelectItem key={variant.size} value={variant.size}>
                      {variant.size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="mb-8">
            <label className="mb-3 block text-sm font-medium">Stock: {selectedVariant.stock}</label>
          </div>
          <div className="mb-8">
            <label className="mb-3 block text-sm font-medium">Quantity:</label>
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
                className="rounded-r-none"
              >
                <Minus className="h-4 w-4"/>
              </Button>
              <div className="flex h-10 w-16 items-center justify-center  bg-background text-sm">
                {quantity}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
                disabled={quantity >= selectedVariant.stock}
                className="rounded-l-none"
              >
                <Plus className="h-4 w-4"/>
              </Button>
            </div>
          </div>

          <Button onClick={handleAddToCart} className="mb-8 w-full h-12 text-base">
            Add to Cart +
          </Button>

          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4"/>
              <span>Free Shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="h-4 w-4"/>
              <span>Easy Returns</span>
            </div>
            <div className="flex items-center gap-2">
              <Leaf className="h-4 w-4"/>
              <span>Eco Materials</span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 col-span-2">
          {productImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`aspect-square w-20 overflow-hidden rounded-md border-2 transition-colors ${
                index === currentImageIndex ? "border-foreground" : "border-muted"
              }`}
            >
              <img
                src={loadImage(image) || "/placeholder.svg"}
                alt={`${product.name} view ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      <section className="mt-16">
        <h2 className="mb-8 text-2xl font-bold">You might also like</h2>
        <FeaturedProducts/>
      </section>
    </div>
  )
}
