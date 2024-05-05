"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { XCircle } from "lucide-react"

export default function ErrorPage() {
  return (
    <div className="w-full h-[calc(100vh-5rem)] flex flex-col gap-4 items-center justify-center p-4">
      <XCircle className="w-10 h-10 text-destructive animate-bounce" />
      <p className="text-lg text-muted-foreground">
        Sorry, an unexpected error has occurred.
      </p>
      <Link href={"/"}>
        <Button>Go Home</Button>
      </Link>
    </div>
  )
}
