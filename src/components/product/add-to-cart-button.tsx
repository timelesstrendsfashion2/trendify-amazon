"use client"

import { useMutation } from "@tanstack/react-query"

import { addClick } from "@/actions/product"
import { Button } from "@/components/ui/button"

type AddToCartButtonProps = {
  link: string
  productId: string
}

export function AddToCartButton({ productId, link }: AddToCartButtonProps) {
  const { isPending, mutate: add } = useMutation({
    mutationFn: async () => {
      await addClick(productId)
    },
    onSettled: () => {
      window.open(link, "_blank")
    },
  })

  return (
    <div className="flex items-center gap-x-3 w-full grow shrink-0">
      <Button
        variant="outline"
        disabled={isPending}
        onClick={() => add()}
        className="w-1/2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
      >
        Buy Now!
      </Button>
      <Button
        disabled={isPending}
        onClick={() => add()}
        className="w-1/2 border border-primary hover:bg-background hover:text-primary"
      >
        Add to Cart
      </Button>
    </div>
  )
}
