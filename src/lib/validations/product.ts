import * as z from "zod"
import { PRODUCT_CATEGORY } from "@prisma/client"

export const productSchema = z
  .object({
    title: z
      .string({ required_error: "Please enter a title" })
      .min(1, { message: "Please enter a title" })
      .max(100, { message: "Title is too long" }),
    description: z
      .string({ required_error: "Please enter a description" })
      .min(1, { message: "Please enter a description" })
      .max(2000, { message: "Description is too long" }),
    price: z
      .string({ required_error: "Please enter a price" })
      .min(1, { message: "Please enter a price" })
      .refine((value) => !isNaN(Number(value)), "Please enter a valid price")
      .refine((value) => Number(value) >= 0, "Please enter a valid price"),
    salePrice: z
      .string()
      .optional()
      .refine((value) => !isNaN(Number(value)), "Please enter a valid price")
      .refine(
        (value) => value === undefined || Number(value) >= 0,
        "Please enter a valid price"
      ),
    rating: z
      .string({ required_error: "Please enter product rating" })
      .min(1, { message: "Please enter product rating" })
      .refine((value) => !isNaN(Number(value)), "Please enter a valid rating")
      .refine(
        (value) => Number(value) >= 0 && Number(value) <= 5,
        "Rating must be between 0 and 5"
      ),
    affiliateLink: z
      .string({ required_error: "Please enter a url" })
      .min(1, { message: "Please enter a url" })
      .url({ message: "Please enter a valid url" }),
    category: z.nativeEnum(PRODUCT_CATEGORY, {
      required_error: "Please select a category",
    }),
    isArchieved: z.boolean().default(false),
    isFeatured: z.boolean().default(false),
    tags: z
      .array(
        z
          .string({ required_error: "Please enter a correct tag" })
          .min(1, { message: "Please enter a correct tag" })
      )
      .min(3, { message: "Please enter at least 3 tags" })
      .max(15, { message: "Tags should be less than 15" }),
    images: z
      .array(
        z.object({
          url: z.string().url({ message: "Invalid image url" }),
          name: z.string().min(1),
          key: z.string().min(1),
        })
      )
      .min(1, { message: "Please add at least one image" })
      .max(6, { message: "Too many images" }),
  })
  .refine(
    ({ salePrice, price }) =>
      salePrice === undefined || Number(salePrice) <= Number(price),
    ({ price }) => ({
      message: `Sale price must be less than or equal to ${price}`,
      path: ["salePrice"],
    })
  )

export type ProductInput = z.infer<typeof productSchema>
