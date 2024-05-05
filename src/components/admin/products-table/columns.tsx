"use client"

import Image from "next/image"
import { Product, ProductImage } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"

import { formarCategoryName } from "@/lib/utils"
import { ActionMenu } from "./action-menu"

export const columns: ColumnDef<Product & { images: ProductImage[] }>[] = [
  {
    accessorKey: "images",
    header: "Image",
    cell: ({ row }) => {
      const images = row.getValue("images") as ProductImage[]

      return (
        <div className="relative w-16 aspect-square">
          <Image
            fill
            src={images[0].url}
            alt={images[0].name}
            className="object-cover rounded-md border"
          />
        </div>
      )
    },
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const title = row.getValue("title") as string
      return <p className="truncate max-w-[200px]">{title}</p>
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price)

      return <>{formatted}</>
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const description = row.getValue("description") as string
      return <p className="truncate max-w-[100px]">{description}</p>
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const category = row.getValue("category") as string
      const formatted = formarCategoryName(category)
      return <>{formatted}</>
    },
  },

  {
    accessorKey: "clicks",
    header: "Clicks",
  },
  {
    accessorKey: "isArchieved",
    header: "Archieved",
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const productId = row.original.id
      const title = row.original.title

      return <ActionMenu productId={productId} title={title} />
    },
  },
]
