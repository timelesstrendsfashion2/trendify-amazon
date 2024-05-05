"use client"

import Image from "next/image"
import { toast } from "sonner"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AlertCircle, X } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import { useRouter, useSearchParams } from "next/navigation"

import { Input } from "@/components/ui/input"
import { CATEGORIES } from "@/lib/constants"
import { Checkbox } from "@/components/ui/checkbox"
import { UploadDropzone } from "@/lib/uploadthing"
import { Alert, AlertTitle } from "@/components/ui/alert"
import { Button, buttonVariants } from "@/components/ui/button"
import { KeywordsInput } from "@/components/ui/keywords-input"
import { Textarea } from "@/components/ui/textarea"
import { createProduct, updateProduct } from "@/actions/product"
import { ProductInput, productSchema } from "@/lib/validations/product"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type ProductFormProps = {
  initialValues?: ProductInput
}

export function ProductForm({ initialValues }: ProductFormProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const productId = searchParams.get("id") ?? ""

  const form = useForm<ProductInput>({
    resolver: zodResolver(productSchema),
    mode: "onChange",
    defaultValues: initialValues
      ? initialValues
      : {
          title: "",
          description: "",
          price: "",
          images: [],
        },
  })

  const { append, remove } = useFieldArray({
    control: form.control,
    name: "images",
  })

  const submitError = form.formState.errors.root

  const images = form.watch("images")

  const { isPending: isCreating, mutate: create } = useMutation({
    mutationFn: async (data: ProductInput) => {
      const { product, error } = await createProduct(data)

      if (error) {
        throw new Error(error)
      }
    },
    onError(err) {
      form.setError("root", {
        type: "custom",
        message:
          err.message ?? "Error creating product, please try again later",
      })
    },
    onSuccess() {
      form.reset()
      router.push("/admin")
      router.refresh()
      toast.success(`Product Created successfully!`)
    },
  })

  const { isPending: isUpdating, mutate: update } = useMutation({
    mutationFn: async (data: ProductInput) => {
      const { error } = await updateProduct(productId, data)

      if (error) {
        throw new Error(error)
      }
    },
    onError(err) {
      form.setError("root", {
        type: "custom",
        message:
          err.message ?? "Error updating product, please try again later",
      })
    },
    onSuccess() {
      router.push("/admin")
      router.refresh()
      toast.success(`Product Updated successfully!`)
    },
  })

  const isPending = isCreating || isUpdating

  const onSubmit = form.handleSubmit(async (data) => {
    form.clearErrors()
    if (initialValues) {
      update(data)
    } else {
      create(data)
    }
  })

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={onSubmit}>
        {submitError && (
          <Alert variant="destructive">
            <AlertCircle className="h-5 w-5" />
            <AlertTitle>
              {submitError.message ??
                "Error logging in, please try again later"}
            </AlertTitle>

            <button
              disabled={isPending}
              className="ml-auto"
              type="button"
              onClick={() => form.clearErrors("root")}
            >
              <X className="h-4 w-4" />
            </button>
          </Alert>
        )}

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input autoFocus type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat.slug} value={cat.slug}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="salePrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sale Price</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="affiliateLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Affiliate Link</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <KeywordsInput
                  initialKeywords={field.value}
                  onKeywordsChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {images.length < 6 && (
          <FormField
            control={form.control}
            name="images"
            render={() => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <UploadDropzone
                    className="border border-border"
                    endpoint="imageUploader"
                    appearance={{
                      label: "!text-primary hover:text-primary",
                      button: buttonVariants(),
                    }}
                    onClientUploadComplete={(files) => {
                      files.map((file) => {
                        append({
                          url: file.url,
                          name: file.name,
                          key: file.key,
                        })
                      })
                    }}
                    onUploadError={() =>
                      form.setError("root", {
                        message:
                          "Error uploading images, please try again later",
                      })
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {images.length > 0 && (
          <div className="grid sm:grid-cols-3 grid-cols-2 gap-2 items-center">
            {images.map((image, index) => (
              <div
                key={image.key}
                className="relative group w-full max-w-[200px] h-[200px] rounded-md bg-accent mx-auto border"
              >
                <button
                  onClick={() => remove(index)}
                  type="button"
                  className="absolute -top-1.5 -right-1.5 p-1 rounded-full bg-destructive text-destructive-foreground z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-3 w-3" />
                </button>
                <Image
                  fill
                  src={image.url}
                  alt={image.name}
                  className="object-cover rounded-md"
                />
              </div>
            ))}
          </div>
        )}

        <FormField
          control={form.control}
          name="isFeatured"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>

              <div className="space-y-1 leading-none">
                <FormLabel>Feature Product</FormLabel>
                <FormDescription>
                  This product will be shown in the featured section
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isArchieved"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>

              <div className="space-y-1 leading-none">
                <FormLabel>Archive Product</FormLabel>
                <FormDescription>
                  This product will be archived and won&apos;t be accessed by
                  customers.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <Button className="w-full" type="submit" isLoading={isPending}>
          {initialValues ? "Update" : "Create"}
        </Button>
      </form>
    </Form>
  )
}
