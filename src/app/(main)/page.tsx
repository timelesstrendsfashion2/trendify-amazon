import Image from "next/image"

import { db } from "@/lib/db"
import { ProductCard } from "@/components/product/product-card"

export default async function HomePage() {
  const products = await db.product.findMany({
    where: {
      isArchieved: false,
      isFeatured: true,
    },
    include: {
      images: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 8,
  })

  return (
    <div className="w-full">
      <div className="w-full h-96 relative">
        <Image
          fill
          src={"/mobile-accessories.png"}
          alt="Mobile accessories"
          className="object-cover"
        />
      </div>

      <div className="py-12 max-w-7xl mx-auto px-6 space-y-8">
        <h1 className="text-3xl font-bold">Featured Products</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  )
}
