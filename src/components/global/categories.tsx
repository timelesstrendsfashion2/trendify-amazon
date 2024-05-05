"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"

import { CATEGORIES } from "@/lib/constants"
import { Button } from "@/components/ui/button"

export function Categories() {
  const searchParams = useSearchParams()
  const category = searchParams.get("category")

  return (
    <ul className="items-center gap-3 list-none lg:flex hidden">
      {CATEGORIES.map((cat) => (
        <Link key={cat.slug} href={`/search?category=${cat.slug}`}>
          <Button
            size="sm"
            variant={category && category === cat.slug ? "secondary" : "ghost"}
          >
            {cat.name}
          </Button>
        </Link>
      ))}
    </ul>
  )
}
