import {type CreateProductRequest, createProductSchema} from "@/models/dto/request/create-product.ts";
import {useForm, useFieldArray} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus, X, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import {type ChangeEvent, useEffect, useState} from "react";
import {ProductService} from "@/services/product-service.ts";
import {useMutation, type UseMutationResult} from "@tanstack/react-query";
import {ToastService} from "@/utils/toast.ts";
import {changeImageName} from "@/utils/utils.ts";
import type {ProductResponse} from "@/models/dto/response/product-response.ts";
import type {Nullable} from "@/models/types/utils";
import {getProjectEnvVariables} from "@/utils/env.ts";
import type {CategoryResponse} from "@/models/dto/response/category-response.ts";
import {CategoryService} from "@/services/category-service.ts";

interface IProps {
  open: boolean
  onClose: () => void
  getProducts: UseMutationResult<ProductResponse[], Error, void>,
  selectedProduct?: Nullable<ProductResponse>
}
const ProductForm = ({open, onClose,getProducts,selectedProduct} : IProps) => {
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [variantImagePreviews, setVariantImagePreviews] = useState<string[]>([])
  const [categories, setCategories] = useState<CategoryResponse[]>([])

  const fetchCategories = useMutation({
    mutationFn: CategoryService.getAllCategories,
    onSuccess: (data) => {
      setCategories(data)
    },
    onError: (error) => {
      ToastService.error(error.message || "Failed to fetch categories. Please try again.")
    },
  })

  const form = useForm<CreateProductRequest>({
    resolver: zodResolver(createProductSchema),
  })

  useEffect(() => {
    fetchCategories.mutate()
  }, [])

  useEffect(() => {
    setImagePreviews([])
    setVariantImagePreviews([])
    if (selectedProduct) {
      form.reset({
        id: selectedProduct.id,
        name: selectedProduct.name,
        description: selectedProduct.description,
        categoryId: selectedProduct.category.id,
        variants: selectedProduct.productVariants,
        images: selectedProduct.productImages,
      });
      selectedProduct.productImages.forEach((image, index) => {
        setImagePreviews(prev => ({...prev, [index]: `${getProjectEnvVariables().VITE_MINIO_URL}${image.productImage}` }));
      });

      selectedProduct.productVariants.forEach((variant, index) => {
        setVariantImagePreviews(prev => ({...prev, [index]: `${getProjectEnvVariables().VITE_MINIO_URL}${variant.variantImage}` }));
      });
      return
    }
    form.reset({
      id: undefined,
      name: "",
      description: "",
      categoryId: "",
      variants: [
        {
          size: "",
          color: "",
          variantImage: "",
          price: 0,
          stock: 0,
        },
      ],
      images: [
        {
          productImage: "",
        },
      ],
    })

  }, [selectedProduct, open]);

  const {
    fields: variantFields,
    append: appendVariant,
    remove: removeVariant,
  } = useFieldArray({
    control: form.control,
    name: "variants",
  })

  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray({
    control: form.control,
    name: "images",
  })

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    if (e.target.files && e.target.files[0]) {
      const file = changeImageName(e.target.files[0]);
      form.setValue(`images.${index}`, {id: undefined,productImage: file.name, imageFile: file});
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setImagePreviews((prev) => ({
            ...prev,
            [index]: reader.result as string,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  }

  const handleVariantImageUpload = (event: ChangeEvent<HTMLInputElement>, index: number) => {
    if (event.target.files && event.target.files[0]) {
      const file = changeImageName(event.target.files[0]);
      form.setValue(`variants.${index}`, {
        ...form.getValues(`variants.${index}`),
        id: undefined,
        variantImage: file.name,
        imageFile: file,
      });
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setVariantImagePreviews((prev) => ({
            ...prev,
            [index]: reader.result as string,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  }

  const addMutation = useMutation({
    mutationFn: ProductService.createProduct,
    onSuccess: () => {
      ToastService.success("Product created successfully!")
      form.reset()
      setImagePreviews([])
      setVariantImagePreviews([])
      getProducts.mutate()
      onClose()
    },
    onError: (error) => {
      ToastService.error(error.message || "Failed to create product. Please try again.")
    },
  })

  const updateMutation = useMutation({
    mutationFn: ProductService.updateProduct,
    onSuccess: () => {
      ToastService.success("Product updated successfully!")
      form.reset()
      setImagePreviews([])
      setVariantImagePreviews([])
      getProducts.mutate()
      onClose()
    },
    onError: (error) => {
      ToastService.error(error.message || "Failed to update product. Please try again.")
    },
  })



  const handleSubmit = async (data : CreateProductRequest) => {
    selectedProduct ? updateMutation.mutate(data) : addMutation.mutate(data)
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="!w-[100vw] !max-w-[75vw] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {selectedProduct ? "Update Product" : "Add New Product"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter product name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className={"w-full"}>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem value={category.id}>{category.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter product description" rows={3} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-center gap-4 flex-wrap md:justify-between ">
                  <CardTitle>Product Images</CardTitle>
                  <Button className={"w-full md:w-auto"} type="button" variant="outline" size="sm" onClick={() => appendImage({ productImage: "" })}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Image
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {imageFields.map((field, index) => (
                    <Card key={field.id}>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-sm">Image {index + 1}</CardTitle>
                          {imageFields.length > 1 && (
                            <Button type="button" variant="ghost" size="sm" onClick={() => {
                                removeImage(index)
                            }}>
                              <X className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        {imagePreviews[index] ? (
                          <div className="space-y-4">
                            <div className="relative">
                              <img
                                src={imagePreviews[index] || "/placeholder.svg"}
                                alt={`Product preview ${index + 1}`}
                                className="w-full min-h-20 h-full object-fit rounded-lg border"
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                className="absolute top-2 right-2"
                                onClick={() => {
                                  setImagePreviews((prev) => {
                                    const newState = { ...prev };
                                    delete newState[index];
                                    return newState;
                                  });
                                  form.setValue(`images.${index}`, {id: undefined, productImage: "", imageFile: undefined });
                                }}
                                >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e, index)}
                              className="hidden"
                              id={`image-${index}`}
                            />
                            <Label htmlFor={`image-${index}`} className="cursor-pointer flex items-center justify-center flex-col">
                              <Upload className="w-8 h-8 text-muted-foreground" />
                              <p className="text-sm text-muted-foreground">Click to upload image</p>
                              {form.formState.errors.images?.[index]?.productImage?.message && (
                                <p className="text-red-500">{form.formState.errors.images[index].productImage.message}</p>
                              )}

                            </Label>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-center gap-4 flex-wrap md:justify-between">
                  <CardTitle>Product Variants</CardTitle>
                  <Button
                    className={"w-full md:w-auto"}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => appendVariant({ size: "", color: "", variantImage: "", price: 0, stock: 0 })}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Variant
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {variantFields.map((field, index) => (
                    <Card key={field.id}>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-sm">Variant {index + 1}</CardTitle>
                          {variantFields.length > 1 && (
                            <Button type="button" variant="ghost" size="sm" onClick={() => {

                              console.log(index)
                              if (index >= variantImagePreviews.length){
                                setVariantImagePreviews((prev: string[]) => {
                                  const newPreviews = [...prev];
                                  newPreviews.splice(index, 1);
                                  return newPreviews;
                                });
                              }
                              removeVariant(index);
                            }}>
                              <X className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name={`variants.${index}.size`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Size</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g., S, M, L" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`variants.${index}.color`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Color</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g., Red, Blue" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`variants.${index}.price`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    step="0.01"
                                    placeholder="0.00"
                                    {...field}
                                    onChange={(e) => field.onChange(Number.parseFloat(e.target.value) || 0)}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`variants.${index}.stock`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Stock</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    placeholder="0"
                                    {...field}
                                    onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div>
                          {variantImagePreviews[index] ? (
                            <div className="space-y-4 mt-2">
                              <div className="relative">
                                <img
                                  src={variantImagePreviews[index] || "/placeholder.svg"}
                                  alt={`Variant preview ${index + 1}`}
                                  className="w-full h-full object-cover rounded-lg border"
                                />
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="sm"
                                  className="absolute top-2 right-2"
                                  onClick={() => {
                                    setVariantImagePreviews((prev) => {
                                      const newState = { ...prev };
                                      delete newState[index];
                                      return newState;
                                    });
                                    form.setValue(`variants.${index}`, {
                                      ...form.getValues(`variants.${index}`),
                                      variantImage: "",
                                      imageFile: undefined,
                                    });
                                  }}
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              </div>

                            </div>
                          ) : (
                            <div className="border-2 border-dashed border-muted rounded-lg p-4 text-center mt-2">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleVariantImageUpload(e, index)}
                                className="hidden"
                                id={`variant-image-${index}`}
                              />
                              <Label htmlFor={`variant-image-${index}`} className="cursor-pointer flex items-center justify-center flex-col">
                                <Upload className="w-6 h-6 text-muted-foreground" />
                                <p className="text-sm text-muted-foreground">Upload variant image</p>
                                {form.formState.errors.variants?.[index]?.variantImage?.message && (
                                  <p className="text-red-500">{form.formState.errors.variants[index].variantImage.message}</p>
                                )}
                              </Label>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Separator />

            <div className="flex justify-end space-x-4">
              <Button disabled={addMutation.isPending || updateMutation.isPending} type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button disabled={addMutation.isPending || updateMutation.isPending} type="submit">
                {
                  selectedProduct ? updateMutation.isPending ? "Updating..." : "Update Product" :
                    addMutation.isPending ? "Creating..." : "Create Product"
                }
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default ProductForm