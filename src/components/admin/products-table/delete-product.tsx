"use client"

import { toast } from "sonner"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

import { deleteProduct } from "@/actions/product"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

type DeleteProductProps = {
  productId: string
  name: string
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function DeleteProduct({
  productId,
  name,
  isOpen,
  onOpenChange,
}: DeleteProductProps) {
  const router = useRouter()

  const { isPending, mutate: deleteProd } = useMutation({
    mutationFn: async () => {
      await deleteProduct(productId)
    },
    onSuccess: () => {
      router.refresh()
      toast.success("Product deleted successfully")
    },
    onError: () => {
      toast.error("Error deleting product, please try again later")
    },
  })

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Product &rdquo;{name}&rdquo; will be deleted permanently. This
            action can&apos;t be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending} className="sm:w-auto w-full">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            className="sm:w-[80px] w-full"
            onClick={() => deleteProd()}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
