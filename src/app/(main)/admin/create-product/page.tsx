import { ProductForm } from "@/components/admin/product-form"
import { getSession } from "@/lib/auth"
import { notFound } from "next/navigation"

export default async function CreateProductPage() {
  const session = await getSession()

  if (!session || session.role !== "ADMIN") {
    notFound()
  }

  return (
    <div className="px-6 max-w-2xl py-12 mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Create Product</h1>
      <ProductForm />
    </div>
  )
}
