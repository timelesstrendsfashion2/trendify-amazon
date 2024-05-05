import { getSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { notFound } from "next/navigation"
import { ProductInput } from "@/lib/validations/product"
import { ProductForm } from "@/components/admin/product-form"

type EditProductPageProps = {
  searchParams: {
    id: string | undefined
  }
}

export default async function EditProductPage({
  searchParams: { id },
}: EditProductPageProps) {
  const session = await getSession()

  if (!session || session.role !== "ADMIN") {
    notFound()
  }

  if (!id) {
    notFound()
  }

  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      images: true,
    },
  })

  if (!product) {
    notFound()
  }

  return (
    <div className="px-6 max-w-2xl py-12 mx-auto space-y-6">
      <h1 className="text-2xl font-bold">
        <span className="text-primary">Edit:</span> {product.title}
      </h1>
      <ProductForm initialValues={product as ProductInput} />
    </div>
  )
}
