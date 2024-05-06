"use client"

import { useMutation } from "@tanstack/react-query"

import { addClick } from "@/actions/product"
import { Button } from "@/components/ui/button"

type AddToCartButtonProps = {
  link: string
  productId: string
}

export function BuyButton({ productId, link }: AddToCartButtonProps) {
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
        className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
      >
        Buy Now!<sub className="text-xs">(Amazon)</sub>
      </Button>
    </div>
  )
}
