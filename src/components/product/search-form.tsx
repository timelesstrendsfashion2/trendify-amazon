"use client"

import * as React from "react"
import { Search } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function SearchForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const query = searchParams.get("q")
  const category = searchParams.get("category")

  const [search, setSearch] = React.useState(query || "")

  React.useEffect(() => {
    setSearch(query || "")
  }, [query])

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (category) {
      router.push(`/search?q=${search}&category=${category}`)
    } else {
      router.push(`/search?q=${search}`)
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full flex items-center">
      <Input
        autoFocus
        type="text"
        value={search}
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
        className="bg-transparent h-12 border border-primary rounded-r-none"
      />
      <Button
        type="submit"
        className="h-12 w-12 border border-primary rounded-l-none p-0"
      >
        <Search className="w-5 h-5" />
      </Button>
    </form>
  )
}
