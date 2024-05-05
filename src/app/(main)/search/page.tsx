import Image from "next/image"

import noResults from "@/../public/no-results.png"
import { formarCategoryName } from "@/lib/utils"
import { PRODUCT_CATEGORY } from "@prisma/client"
import { SearchForm } from "@/components/product/search-form"
import { searchProducts } from "@/actions/product"
import { ProductCard } from "@/components/product/product-card"

type SearchPageProps = {
  searchParams: {
    category?: PRODUCT_CATEGORY
    q?: string
  }
}

export default async function SearchPage({
  searchParams: { q, category },
}: SearchPageProps) {
  function heading() {
    if (q && category) {
      return `Search results for "${q}" in ${formarCategoryName(category)}`
    } else if (q) {
      return `Search results for "${q}"`
    } else if (category) {
      return `All ${formarCategoryName(category)}`
    } else {
      return "Search"
    }
  }

  function noResultsDescription() {
    if (q && category) {
      return `No products found for "${q}" in ${formarCategoryName(category)}`
    } else if (q) {
      return `No products found for "${q}"`
    } else if (category) {
      return `No products found in ${formarCategoryName(category)}`
    } else {
      return "No products found"
    }
  }

  const products = await searchProducts(q, category)

  return (
    <main className="py-12 px-6 max-w-7xl mx-auto w-full space-y-8">
      <h1 className="sm:text-3xl text-2xl font-bold">{heading()}</h1>
      <SearchForm />
      {products.length <= 0 && (
        <div className="py-5 text-lg font-semibold w-full flex flex-col items-center justify-center space-y-4">
          <Image src={noResults} alt="No results" className="w-40" />
          {noResultsDescription()}
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  )
}
