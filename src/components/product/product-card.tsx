"use client"

import Image from "next/image"
import Link from "next/link"
import { Star, StarHalf } from "lucide-react"
import { Product, ProductImage } from "@prisma/client"
import { RatingStars } from "./rating-stars"

type ProductCardProps = {
  product: Product & {
    images: ProductImage[]
  }
}

export function ProductCard({ product }: ProductCardProps) {
  const shouldShowSale =
    !!product?.salePrice && product?.salePrice !== product?.price

  return (
    <Link
      href={`/p/${product.id}`}
      className="group space-y-1 relative w-full overflow-hidden rounded-lg shadow-md border"
    >
      <div className="relative w-full aspect-square rounded-t-lg overflow-hidden">
        <Image
          fill
          src={product.images[0].url}
          alt={product.title}
          className="object-cover group-hover:scale-110 transition-all duration-300"
        />
      </div>

      {shouldShowSale && (
        <span className="absolute top-0 left-0 w-28 translate-y-4 -translate-x-6 -rotate-45 bg-primary text-center text-sm text-primary-foreground">
          Sale
        </span>
      )}

      <div className="mt-4 px-5 pb-5">
        <h5 className="text-xl font-semibold tracking-tight">
          {product.title}
        </h5>

        <div className="mt-2.5 mb-5 flex items-center">
          <span className="mr-2 rounded text-black bg-yellow-300 px-2.5 py-0.5 text-xs font-semibold">
            {product.rating}
          </span>
          <RatingStars rating={product.rating} />
        </div>

        <p>
          <span className="text-3xl font-bold">
            ${shouldShowSale ? product.salePrice : product.price}
          </span>{" "}
          {shouldShowSale && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.price}
            </span>
          )}
        </p>
      </div>
    </Link>
  )
}
