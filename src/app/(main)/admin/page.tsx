import Link from "next/link"
import { notFound } from "next/navigation"

import { db } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { getSession } from "@/lib/auth"
import { PlusCircle } from "lucide-react"
import { ADMIN_PRODUCTS_LIMIT } from "@/lib/constants"
import { ProductsTable } from "@/components/admin/products-table"
import { columns } from "@/components/admin/products-table/columns"
import { SearchForm } from "@/components/product/search-form"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

type AdminPageProps = {
  searchParams: {
    page?: string
    q?: string
  }
}

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const session = await getSession()
  const query = searchParams.q
  const parsedPage = parseInt(searchParams.page ?? "1")
  const page = parsedPage <= 0 ? 1 : parsedPage

  if (!session || session.role !== "ADMIN") {
    notFound()
  }

  const products = await db.product.findMany({
    where: query
      ? {
          OR: [
            {
              title: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              description: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              tags: {
                has: query,
              },
            },
          ],
        }
      : undefined,
    include: {
      images: {
        take: 1,
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
    take: ADMIN_PRODUCTS_LIMIT,
    skip: (page - 1) * ADMIN_PRODUCTS_LIMIT,
  })

  const totalCount = await db.product.count()

  const totalPages = Math.ceil(totalCount / ADMIN_PRODUCTS_LIMIT)

  const nearbyPages = []
  const totalPagesToShow = 3
  const startPage = Math.max(
    2,
    Math.min(
      page - Math.floor(totalPagesToShow / 2),
      totalPages - totalPagesToShow + 1
    )
  )
  const endPage = Math.min(totalPages - 1, startPage + totalPagesToShow - 1)

  for (let i = startPage; i <= endPage; i++) {
    nearbyPages.push(i)
  }

  return (
    <div className="py-12 max-w-7xl w-full mx-auto px-6 space-y-8">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link href="/admin/create-product">
          <Button>
            <PlusCircle className="h-5 w-5" />
            Create Product
          </Button>
        </Link>
      </div>

      <SearchForm />
      <ProductsTable data={products} columns={columns} />

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            {page > 1 && (
              <PaginationItem>
                <PaginationPrevious
                  href={`/admin?page=${page - 1}`}
                  aria-disabled={page === 1}
                />
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationLink href={`/admin?page=1`} isActive={page === 1}>
                1
              </PaginationLink>
            </PaginationItem>

            {page > 3 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            {nearbyPages.map((pageNumber) => (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  href={`/admin?page=${pageNumber}`}
                  isActive={page === pageNumber}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            ))}

            {page < totalPages - 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationLink
                href={`/admin?page=${totalPages}`}
                isActive={page === totalPages}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>

            {page < totalPages && (
              <PaginationItem>
                <PaginationNext
                  href={`/admin?page=${page + 1}`}
                  aria-disabled={page === totalPages || totalPages === 0}
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}
