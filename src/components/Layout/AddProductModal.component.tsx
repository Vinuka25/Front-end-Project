import { Plus } from "lucide-react"
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
import type { Category } from "@/types/products.type"
import { createProduct } from "@/services/products.service"
import { useState } from "react"

interface AddProductDialogProps {
  categories: Category[]
  onCreated?: () => void
}

const emptyForm = {
  categoryId: "",
  name: "",
  slug: "",
  sku: "",
  description: "",
  price: "",
  comparePrice: "",
  stock: "",
  status: "active",
  isFeatured: false,
}

export function AddProductDialog({ categories, onCreated }: AddProductDialogProps) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [thumbnail, setThumbnail] = useState<File | null>(null)
  const [images, setImages] = useState<FileList | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const update = <K extends keyof typeof emptyForm>(key: K, value: (typeof emptyForm)[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const resetForm = () => {
    setForm(emptyForm)
    setThumbnail(null)
    setImages(null)
    setError(null)
  }

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen)
    if (!nextOpen) resetForm()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!form.name || !form.price) {
      setError("Product name and price are required.")
      return
    }

    const formData = new FormData()
    if (form.categoryId) formData.append("category_id", form.categoryId)
    formData.append("name", form.name)
    if (form.slug) formData.append("slug", form.slug)
    if (form.sku) formData.append("sku", form.sku)
    formData.append("description", form.description)
    formData.append("price", form.price)
    if (form.comparePrice) formData.append("compare_price", form.comparePrice)
    formData.append("stock_quantity", form.stock || "0")
    formData.append("status", form.status)
    formData.append("is_featured", form.isFeatured ? "1" : "0")
    if (thumbnail) formData.append("thumbnail", thumbnail)
    if (images) {
      Array.from(images).forEach((file) => formData.append("images[]", file))
    }

    setIsSubmitting(true)
    try {
      await createProduct(formData)
      onCreated?.()
      handleOpenChange(false)
    } catch (err) {
      const message =
        (err as { message?: string })?.message || "Failed to create product. Please try again."
      setError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger render={<Button variant="outline" />}>
        <Plus />
        Add Product
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg bg-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
          <DialogDescription>
            Fill in the product details below.
          </DialogDescription>
        </DialogHeader>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Category */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="category">Category</Label>
            <Select value={form.categoryId} onValueChange={(value) => update("categoryId", value as string)}>
              <SelectTrigger id="category" className="w-full">
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
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              placeholder="e.g. Wireless Earbuds"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              required
            />
          </div>

          {/* Slug + SKU, side by side */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="slug">Slug (optional)</Label>
              <Input
                id="slug"
                placeholder="wireless-earbuds"
                value={form.slug}
                onChange={(e) => update("slug", e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="sku">SKU (optional)</Label>
              <Input
                id="sku"
                placeholder="ELEC-EB-001"
                value={form.sku}
                onChange={(e) => update("sku", e.target.value)}
              />
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Short product description"
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
            />
          </div>

          {/* Price + Compare Price */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={form.price}
                onChange={(e) => update("price", e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="compare_price">Compare Price</Label>
              <Input
                id="compare_price"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={form.comparePrice}
                onChange={(e) => update("comparePrice", e.target.value)}
              />
            </div>
          </div>

          {/* Stock + Status */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="stock">Stock Quantity</Label>
              <Input
                id="stock"
                type="number"
                placeholder="0"
                value={form.stock}
                onChange={(e) => update("stock", e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="status">Status</Label>
              <Select value={form.status} onValueChange={(value) => update("status", value as string)}>
                <SelectTrigger id="status" className="w-full">
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
              id="is_featured"
              checked={form.isFeatured}
              onCheckedChange={(checked) => update("isFeatured", checked === true)}
            />
            <Label htmlFor="is_featured">Mark as featured</Label>
          </div>

          {/* Thumbnail */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="thumbnail">Thumbnail (single image)</Label>
            <Input
              id="thumbnail"
              type="file"
              accept="image/*"
              onChange={(e) => setThumbnail(e.target.files?.[0] ?? null)}
            />
          </div>

          {/* Gallery images */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="images">Gallery Images (multiple)</Label>
            <Input
              id="images"
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setImages(e.target.files)}
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <DialogFooter>
            <DialogClose render={<Button type="button" variant="outline" />}>
              Cancel
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Product"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
