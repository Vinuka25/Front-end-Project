import { useState, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
import type { Category, Product } from "@/types/products.type"
import { updateProduct } from "@/services/products.service"

interface EditProductDialogProps {
  product: Product
  categories: Category[]
  trigger: ReactNode
  onUpdated?: () => void
}

function toFormState(product: Product) {
  return {
    categoryId: String(product.category_id),
    name: product.name,
    slug: product.slug,
    sku: product.sku,
    description: product.description,
    price: String(product.price),
    comparePrice: product.compare_price != null ? String(product.compare_price) : "",
    stock: String(product.stock_quantity),
    status: product.status as Product["status"],
    isFeatured: product.is_featured,
    images: product.images_urls,
  }
}

export function EditProductDialog({ product, categories, trigger, onUpdated }: EditProductDialogProps) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(() => toFormState(product))
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const update = <K extends keyof ReturnType<typeof toFormState>>(
    key: K,
    value: ReturnType<typeof toFormState>[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen)
    if (nextOpen) {
      // Re-sync with the latest product data each time the dialog opens.
      setForm(toFormState(product))
      setError(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!form.name || !form.price) {
      setError("Product name and price are required.")
      return
    }

    const payload = {
      category_id: form.categoryId ? Number(form.categoryId) : undefined,
      name: form.name,
      slug: form.slug || undefined,
      sku: form.sku || undefined,
      description: form.description,
      price: Number(form.price),
      compare_price: form.comparePrice ? Number(form.comparePrice) : null,
      stock_quantity: Number(form.stock || 0),
      status: form.status,
      is_featured: form.isFeatured,
    }

    setIsSubmitting(true)
    try {
      await updateProduct(product.id, payload)
      onUpdated?.()
      handleOpenChange(false)
    } catch (err) {
      const message =
        (err as { message?: string })?.message || "Failed to update product. Please try again."
      setError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger render={trigger as React.ReactElement} />

      <DialogContent className="sm:max-w-lg bg-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>
            Update the product details below.
          </DialogDescription>
        </DialogHeader>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Category */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="edit-category">Category</Label>
            <Select value={form.categoryId} onValueChange={(value) => update("categoryId", value as string)}>
              <SelectTrigger id="edit-category" className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={String(cat.id)}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Product name */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="edit-name">Product Name</Label>
            <Input id="edit-name" value={form.name} onChange={(e) => update("name", e.target.value)} required />
          </div>

          {/* Slug + SKU */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="edit-slug">Slug</Label>
              <Input id="edit-slug" value={form.slug} onChange={(e) => update("slug", e.target.value)} />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="edit-sku">SKU</Label>
              <Input id="edit-sku" value={form.sku} onChange={(e) => update("sku", e.target.value)} />
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="edit-description">Description</Label>
            <Textarea
              id="edit-description"
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
            />
          </div>

          {/* Price + Compare Price */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="edit-price">Price</Label>
              <Input
                id="edit-price"
                type="number"
                step="0.01"
                value={form.price}
                onChange={(e) => update("price", e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="edit-compare_price">Compare Price</Label>
              <Input
                id="edit-compare_price"
                type="number"
                step="0.01"
                value={form.comparePrice}
                onChange={(e) => update("comparePrice", e.target.value)}
              />
            </div>
          </div>

          {/* Stock + Status */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="edit-stock">Stock Quantity</Label>
              <Input
                id="edit-stock"
                type="number"
                value={form.stock}
                onChange={(e) => update("stock", e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="edit-status">Status</Label>
              <Select value={form.status} onValueChange={(value) => update("status", value as Product["status"])}>
                <SelectTrigger id="edit-status" className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Featured checkbox */}
          <div className="flex items-center gap-2">
            <Checkbox
              id="edit-is_featured"
              checked={form.isFeatured}
              onCheckedChange={(checked) => update("isFeatured", checked === true)}
            />
            <Label htmlFor="edit-is_featured">Mark as featured</Label>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <DialogFooter>
            <DialogClose render={<Button type="button" variant="outline" />}>
              Cancel
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
