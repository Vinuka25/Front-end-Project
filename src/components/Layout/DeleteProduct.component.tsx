import { useState, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTrigger,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog"
import type { Product } from "@/types/products.type"
import { deleteProduct } from "@/services/products.service"

interface DeleteProductDialogProps {
  product: Product
  trigger: ReactNode
  onDeleted?: () => void
}

export function DeleteProductDialog({ product, trigger, onDeleted }: DeleteProductDialogProps) {
  const [open, setOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen)
    if (nextOpen) setError(null)
  }

  const handleDelete = async () => {
    setError(null)
    setIsDeleting(true)
    try {
      await deleteProduct(product.id)
      onDeleted?.()
      setOpen(false)
    } catch (err) {
      const message =
        (err as { message?: string })?.message || "Failed to delete product. Please try again."
      setError(message)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogTrigger render={trigger as React.ReactElement} />

      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete "{product.name}"?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently remove the
            product from your catalog.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <AlertDialogFooter>
          <AlertDialogCancel render={<Button variant="outline" />}>
            Cancel
          </AlertDialogCancel>
          <Button
            variant="destructive"
            
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
