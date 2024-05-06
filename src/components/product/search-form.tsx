"use client"

import * as React from "react"
import qs from "query-string"
import { Search } from "lucide-react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function SearchForm() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const query = searchParams.get("q")

  const [search, setSearch] = React.useState(query || "")

  React.useEffect(() => {
    setSearch(query || "")
  }, [query])

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()

    let currentQuery = {}

    if (searchParams) {
      currentQuery = qs.parse(searchParams.toString())
    }

    const updatedQuery = {
      ...currentQuery,
      q: search,
    }

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: updatedQuery,
      },
      {
        skipNull: true,
        skipEmptyString: true,
      }
    )

    router.push(url)
  }

  return (
    <form onSubmit={onSubmit} className="w-full flex items-center">
      <Input
        autoFocus
        type="text"
        value={search}
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
        className="bg-transparent border border-primary rounded-r-none"
      />
      <Button
        type="submit"
        className="h-11 w-11 border border-primary rounded-l-none p-0"
      >
        <Search className="w-5 h-5" />
      </Button>
    </form>
  )
}
