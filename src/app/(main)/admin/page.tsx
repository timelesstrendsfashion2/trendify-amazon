import Link from "next/link"
import { notFound } from "next/navigation"

import { Button } from "@/components/ui/button"
import { getSession } from "@/lib/auth"
import { PlusCircle } from "lucide-react"
import { db } from "@/lib/db"
import { ProductsTable } from "@/components/admin/products-table"
import { columns } from "@/components/admin/products-table/columns"

export default async function AdminPage() {
  const session = await getSession()

  if (!session || session.role !== "ADMIN") {
    notFound()
  }

  const products = await db.product.findMany({
    include: {
      images: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  })

  return (
    <div className="py-12 max-w-5xl w-full mx-auto px-6 space-y-8">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link href="/admin/create-product">
          <Button>
            <PlusCircle className="h-5 w-5" />
            Create Product
          </Button>
        </Link>
      </div>

      <ProductsTable data={products} columns={columns} />
    </div>
  )
}
