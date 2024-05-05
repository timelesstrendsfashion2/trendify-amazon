import Image from "next/image"
import Link from "next/link"
import { Edit3 } from "lucide-react"
import { notFound } from "next/navigation"

import { db } from "@/lib/db"
import { getSession } from "@/lib/auth"
import { RatingStars } from "@/components/product/rating-stars"
import { AddToCartButton } from "@/components/product/add-to-cart-button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

type ProductIdPageProps = {
  params: {
    productId: string
  }
}

export default async function ProductIdPage({
  params: { productId },
}: ProductIdPageProps) {
  const session = await getSession()

  const product = await db.product.findUnique({
    where: {
      id: productId,
      isArchieved: false,
    },
    include: {
      images: true,
    },
  })

  if (!product) {
    notFound()
  }

  const shouldShowSale =
    !!product?.salePrice && product?.salePrice !== product?.price

  return (
    <div className="max-w-6xl w-full px-6 py-12 mx-auto flex md:flex-row flex-col gap-8">
      <Carousel className="w-full md:max-w-md mx-auto shrink-0 h-fit">
        <CarouselContent>
          {product.images.map((image) => (
            <CarouselItem key={image.id} className="group">
              <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-accent border">
                <Image
                  fill
                  src={image.url}
                  alt={product.title}
                  className="object-cover rounded-xl"
                />

                {shouldShowSale && (
                  <span className="absolute top-0 left-0 w-28 translate-y-4 -translate-x-6 -rotate-45 bg-primary text-center text-sm text-primary-foreground">
                    Sale
                  </span>
                )}

                {session && session.role === "ADMIN" && (
                  <Link
                    href={`/admin/edit-product/?id=${product.id}`}
                    className="z-10 absolute top-2 right-2 rounded-full scale-0 group-hover:scale-100 transition-all duration-300 p-2 bg-primary text-primary-foreground"
                  >
                    <Edit3 className="w-6 h-6" />
                  </Link>
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div className="w-full space-y-4">
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <div className="flex items-center">
          <span className="mr-2 rounded bg-yellow-300 text-black px-2.5 py-0.5 text-sm font-semibold">
            {product.rating}
          </span>
          <RatingStars rating={product.rating} className="w-7 h-7" />
        </div>

        <div className="flex items-end">
          <h1 className="text-4xl font-extrabold">
            ${shouldShowSale ? product.salePrice : product.price}
          </h1>{" "}
          {shouldShowSale && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.price}
            </span>
          )}
        </div>

        <p className="text-sm text-muted-foreground">{product.description}</p>

        <AddToCartButton productId={product.id} link={product.affiliateLink} />
      </div>
    </div>
  )
}
