"use client"

import * as React from "react"
import Link from "next/link"
import { Edit3, EllipsisVertical, Eye, Trash2 } from "lucide-react"

import { DeleteProduct } from "./delete-product"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type ActionMenuProps = {
  title: string
  productId: string
}

export function ActionMenu({ productId, title }: ActionMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <EllipsisVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <Link href={`/admin/edit-product/?id=${productId}`}>
            <DropdownMenuItem>
              <Edit3 className="mr-2 h-3 w-3" />
              Edit
            </DropdownMenuItem>
          </Link>

          <Link href={`/p/${productId}`}>
            <DropdownMenuItem>
              <Eye className="mr-2 h-3 w-3" />
              View Product
            </DropdownMenuItem>
          </Link>

          <DropdownMenuItem onSelect={() => setIsOpen(true)}>
            <Trash2 className="mr-2 h-3 w-3" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteProduct
        productId={productId}
        name={title}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
      />
    </>
  )
}
