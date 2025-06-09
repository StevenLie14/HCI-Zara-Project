import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { ArrowLeft, Truck, RotateCcw, Leaf, Minus, Plus, ChevronLeft, ChevronRight } from "lucide-react"
import {Select, SelectContent, SelectItem, SelectTrigger} from "@/components/ui/select.tsx";
import {SelectValue} from "@radix-ui/react-select";
import {Button} from "@/components/ui/button.tsx";
import FeaturedProducts from "@/pages/public/featured-product.tsx";

export default function ProductDetailPage() {
  // const { id } = useParams<{ id: string }>()
  const [selectedColor, setSelectedColor] = useState("")
  const [selectedSize, setSelectedSize] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const product = {
    id: "1",
    name: "Stylish T-Shirt",
    price: 29.99,
    description: "A stylish t-shirt made from high-quality materials.",
    image: "/picture/kid-card.png",
    category: "Fashion",
    colors: ["#000000", "#FFC0CB", "#A52A2A", "#F5F5DC", "#808080", "#FFFFFF", "#87CEEB", "#800080", "#1E90FF"],
    sizes: ["S", "M", "L", "XL"],
  }


  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <Link to="/" className="mt-4 inline-block text-blue-600 hover:underline">
          Return to home
        </Link>
      </div>
    )
  }

  const productImages = [
    product.image,
    product.image,
    product.image,
    product.image,
    product.image,
    product.image,
    product.image,
    '/picture/man-card.png',
    product.image,
    product.image,
    product.image,
    product.image,
    product.image,
    product.image,
  ]

  const handleAddToCart = () => {
    // addToCart({
    //   id: product.id,
    //   name: product.name,
    //   price: product.price,
    //   image: product.image,
    //   color: selectedColor,
    //   size: selectedSize,
    //   quantity,
    // })
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length)
  }

  const getColorName = (color: string) => {
    const colorMap: { [key: string]: string } = {
      "#000000": "Black",
      "#FFC0CB": "Pink",
      "#A52A2A": "Brown",
      "#F5F5DC": "Beige",
      "#808080": "Gray",
      "#FFFFFF": "White",
      "#87CEEB": "Sky Blue",
      "#800080": "Purple",
      "#1E90FF": "Blue",
    }
    return colorMap[color] || color
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Link to="/" className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Link>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image with Navigation */}
          <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
            <img
              src={productImages[currentImageIndex] || "/placeholder.svg"}
              alt={product.name}
              className="h-full w-full object-cover"
            />

            {/* Navigation Arrows */}
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

            {/* Image Indicators */}
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

        {/* Product Details */}
        <div className="flex flex-col">
          <div className="mb-2 text-sm text-muted-foreground capitalize">{product.category}'s T-Shirt</div>
          <h1 className="mb-4 text-3xl font-bold">{product.name}</h1>
          <p className="mb-6 text-muted-foreground leading-relaxed">{product.description}</p>
          <div className="mb-6 text-2xl font-bold">${product.price.toFixed(2)}</div>

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-6">
              <label className="mb-3 block text-sm font-medium">Color:</label>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`relative h-8 w-8 rounded-full border-2 transition-all ${
                      selectedColor === color
                        ? "border-foreground scale-110"
                        : "border-muted hover:border-foreground/50"
                    }`}
                    style={{backgroundColor: color}}
                    aria-label={`Select color ${getColorName(color)}`}
                    title={getColorName(color)}
                  >
                    {selectedColor === color && <div className="absolute inset-0 rounded-full border-2 border-white"/>}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-6">
              <label className="mb-3 block text-sm font-medium">Size:</label>
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Size"/>
                </SelectTrigger>
                <SelectContent>
                  {product.sizes.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Quantity */}
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
                className="rounded-l-none"
              >
                <Plus className="h-4 w-4"/>
              </Button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <Button onClick={handleAddToCart} className="mb-8 w-full h-12 text-base">
            Add to Cart +
          </Button>

          {/* Product Features */}
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
                src={image || "/placeholder.svg"}
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
