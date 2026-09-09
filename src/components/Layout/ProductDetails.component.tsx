import type { ReactElement, ReactNode } from "react"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { Product } from "@/types/products.type"

interface ViewProductDialogProps {
  product: Product
  trigger: ReactNode
}

export function ViewProductDialog({ product, trigger }: ViewProductDialogProps) {
  return (
    <Dialog>
      <DialogTrigger render={trigger as ReactElement} />

      <DialogContent className="sm:max-w-lg bg-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
          <DialogDescription>{product.description}</DialogDescription>
        </DialogHeader>

        {/* Thumbnail */}
        <img
          src={product.thumbnail_url}
          alt={product.name}
          className="w-full h-48 object-cover rounded-md"
        />

        {/* Gallery images, if any */}
        {product.images_urls.length > 0 && (
          <div className="flex gap-2 overflow-x-auto">
            {product.images_urls.map((url, i) => (
              <img
                key={i}
                src={url}
                alt={`${product.name} ${i + 1}`}
                className="w-16 h-16 rounded-md object-cover shrink-0"
              />
            ))}
          </div>
        )}

        {/* Details grid */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">SKU</p>
            <p className="font-medium">{product.sku || "—"}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Slug</p>
            <p className="font-medium">{product.slug}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Category</p>
            <Badge variant="secondary" className="mt-1">
              {product.category.name}
            </Badge>
          </div>

          <div>
            <p className="text-muted-foreground">Status</p>
            <Badge
              variant={product.status === "active" ? "default" : "secondary"}
              className="mt-1 capitalize"
            >
              {product.status}
            </Badge>
          </div>

          <div>
            <p className="text-muted-foreground">Price</p>
            <p className="font-medium">${product.price.toFixed(2)}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Compare Price</p>
            <p className="font-medium">
              {product.compare_price ? `$${product.compare_price.toFixed(2)}` : "—"}
            </p>
          </div>

          <div>
            <p className="text-muted-foreground">Stock</p>
            <p className="font-medium">
              {product.in_stock ? product.stock_quantity : (
                <span className="text-destructive">Out of stock</span>
              )}
            </p>
          </div>

          <div>
            <p className="text-muted-foreground">Featured</p>
            <p className="font-medium">{product.is_featured ? "Yes" : "No"}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Created At</p>
            <p className="font-medium">
              {new Date(product.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>

        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>
            Close
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}