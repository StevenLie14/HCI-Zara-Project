import type React from "react"

import { useState } from "react"
import { useForm, useFieldArray, Controller, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Trash2, Plus, ImageIcon } from "lucide-react"
import {type CreateProductDto, createProductSchema} from "src/models/dto/request/create-product.ts";
import {ProductService} from "src/services/product-service.ts";
import {changeFileName} from "src/utils/utils.ts";
import {getProjectEnvVariables} from "src/utils/env.ts";



export default function CreateProductPage() {
  const [variantPreviews, setVariantPreviews] = useState<Record<number, string>>({})
  const [productPreviews, setProductPreviews] = useState<Record<number, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    reset,
  } = useForm<CreateProductDto>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      description: "",
      categoryId: "a",
      variants: [{ size: "", color: "", price: 0, stock: 0 }],
      images: [{productImage: ""}],
    },
  })

  const {
    fields: variantFields,
    append: appendVariant,
    remove: removeVariant,
  } = useFieldArray({
    control,
    name: "variants",
  })

  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray({
    control,
    name: "images",
  })

  const handleVariantImageChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (e.target.files && e.target.files[0]) {
      const file = changeFileName(e.target.files[0])
      setValue(`variants.${index}`, {...getValues(`variants.${index}`),variantImage : file.name,imageFile: file})
      const reader = new FileReader()
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setVariantPreviews((prev) => ({ ...prev, [index]: reader.result as string }))
          const input = document.querySelector(`input[name="variants.${index}.variantImage"]`) as HTMLInputElement
          if (input) {
            input.value = reader.result as string
          }
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleProductImageChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (e.target.files && e.target.files[0]) {
      const file = changeFileName(e.target.files[0])
      setValue(`images.${index}`, {productImage : file.name,imageFile: file})
      const reader = new FileReader()
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setProductPreviews((prev) => ({ ...prev, [index]: reader.result as string }))
          const input = document.querySelector(`input[name="variants.${index}.variantImage"]`) as HTMLInputElement
          if (input) {
            input.value = reader.result as string
          }
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const onSubmit: SubmitHandler<CreateProductDto> = async (data) => {
    setIsSubmitting(true)
    try {
      console.log("Form submitted:", data)

      const resp = await ProductService.createProduct(data)
      console.log("Product created:", resp)

      alert("Product created successfully!")
      reset()
      setVariantPreviews({})
      setProductPreviews({})
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("Failed to create product. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <img className={"w-full h-full"} src={getProjectEnvVariables().VITE_MINIO_URL+"/contact-hero.avif"} alt={"dsa"}/>
      <h1 className="text-2xl font-bold mb-6">Create New Product</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Basic Information</h2>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Product Name*
            </label>
            <input
              id="name"
              {...register("name")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Product Description*
            </label>
            <textarea
              id="description"
              {...register("description")}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Product Images*</h2>
            <button
              type="button"
              onClick={() => appendImage({ productImage: "", imageFile: undefined })}
              className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="h-4 w-4 mr-1" /> Add Image
            </button>
          </div>

          {errors.images?.message && <p className="text-sm text-red-600">{errors.images.message}</p>}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {imageFields.map((field, index) => (
              <div key={field.id} className="border border-gray-200 rounded-md p-4 relative">
                <input type="hidden" {...register(`images.${index}.productImage` as const)} />

                <div className="mb-3 h-40 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                  {productPreviews[index] ? (
                    <img
                      src={productPreviews[index] || "/placeholder.svg"}
                      alt="Product preview"
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <ImageIcon className="h-12 w-12 text-gray-400" />
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <label className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                    Choose Image
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleProductImageChange(e, index)}
                    />
                  </label>

                  {imageFields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  )}
                </div>

                {errors.images?.[index]?.productImage && (
                  <p className="mt-1 text-sm text-red-600">{errors.images[index]?.productImage?.message}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Product Variants*</h2>
            <button
              type="button"
              onClick={() => appendVariant({ size: "", color: "", imageFile: undefined,variantImage: "", price: 0, stock: 0 })}
              className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="h-4 w-4 mr-1" /> Add Variant
            </button>
          </div>

          {errors.variants?.message && <p className="text-sm text-red-600">{errors.variants.message}</p>}

          {variantFields.map((field, index) => (
            <div key={field.id} className="border border-gray-200 rounded-md p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Variant #{index + 1}</h3>
                {variantFields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeVariant(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Size*</label>
                  <input
                    {...register(`variants.${index}.size` as const)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.variants?.[index]?.size && (
                    <p className="mt-1 text-sm text-red-600">{errors.variants[index]?.size?.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Color*</label>
                  <input
                    {...register(`variants.${index}.color` as const)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.variants?.[index]?.color && (
                    <p className="mt-1 text-sm text-red-600">{errors.variants[index]?.color?.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price* (in cents)</label>
                  <Controller
                    control={control}
                    name={`variants.${index}.price` as const}
                    render={({ field }) => (
                      <input
                        type="number"
                        onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                        value={field.value}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    )}
                  />
                  {errors.variants?.[index]?.price && (
                    <p className="mt-1 text-sm text-red-600">{errors.variants[index]?.price?.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock*</label>
                  <Controller
                    control={control}
                    name={`variants.${index}.stock` as const}
                    render={({ field }) => (
                      <input
                        type="number"
                        onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                        value={field.value}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    )}
                  />
                  {errors.variants?.[index]?.stock && (
                    <p className="mt-1 text-sm text-red-600">{errors.variants[index]?.stock?.message}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Variant Image</label>
                  {errors.variants?.[index]?.variantImage && (
                    <p className="mt-1 text-sm text-red-600">{errors.variants[index]?.variantImage?.message}</p>
                  )}
                  <input type="hidden" {...register(`variants.${index}.variantImage` as const)} />

                  <div className="flex items-start space-x-4">
                    <div className="h-24 w-24 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                      {variantPreviews[index] ? (
                        <img
                          src={variantPreviews[index] || "/placeholder.svg"}
                          alt="Variant preview"
                          className="h-full w-full object-contain"
                        />
                      ) : (
                        <ImageIcon className="h-8 w-8 text-gray-400" />
                      )}
                    </div>

                    <label className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                      Choose Image
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleVariantImageChange(e, index)}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Creating Product..." : "Create Product"}
          </button>
        </div>
      </form>
    </div>
  )
}
