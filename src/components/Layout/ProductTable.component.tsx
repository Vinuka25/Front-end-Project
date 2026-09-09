import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ViewProductDialog } from "./ProductDetails.component"
import type { Product, Category } from "@/types/products.type"
import { Eye, Pencil, Trash2 } from "lucide-react"
import { EditProductDialog } from "./EditProduct.component"
import { DeleteProductDialog } from "./DeleteProduct.component"

interface ProductTableProps {
  products: Product[]
  categories: Category[]
  onProductChanged?: () => void
}

export default function ProductTable({ products, categories, onProductChanged }: ProductTableProps) {
  return (
    <div className="rounded-lg border border-violet-100 overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-violet-50 hover:bg-violet-50">
            <TableHead className="border-r border-violet-100 whitespace-nowrap">Product</TableHead>
            <TableHead className="border-r border-violet-100 whitespace-nowrap">SKU</TableHead>
            <TableHead className="border-r border-violet-100 whitespace-nowrap">Category</TableHead>
            <TableHead className="border-r border-violet-100 whitespace-nowrap">Description</TableHead>
            <TableHead className="border-r border-violet-100 whitespace-nowrap">Price</TableHead>
            <TableHead className="border-r border-violet-100 whitespace-nowrap">Compare Price</TableHead>
            <TableHead className="border-r border-violet-100 whitespace-nowrap">Stock</TableHead>
            <TableHead className="border-r border-violet-100 whitespace-nowrap">Status</TableHead>
            <TableHead className="border-r border-violet-100 whitespace-nowrap">Featured</TableHead>
            <TableHead className="border-r border-violet-100 whitespace-nowrap">Created At</TableHead>
            <TableHead className="w-32">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id} className="border-violet-100">
              <TableCell className="border-r border-violet-100">
                <div className="flex items-center gap-3">
                  <img
                    src={product.thumbnail_url}
                    alt={product.name}
                    className="w-10 h-10 rounded-md object-cover"
                  />
                  <span className="font-medium whitespace-nowrap">{product.name}</span>
                </div>
              </TableCell>

              <TableCell className="border-r border-violet-100 whitespace-nowrap">
                {product.sku}
              </TableCell>

              <TableCell className="border-r border-violet-100">
                <Badge variant="secondary">{product.category.name}</Badge>
              </TableCell>

              <TableCell className="border-r border-violet-100 max-w-[200px] truncate">
                {product.description}
              </TableCell>

              <TableCell className="border-r border-violet-100 whitespace-nowrap">
                ${product.price.toFixed(2)}
              </TableCell>

              <TableCell className="border-r border-violet-100 whitespace-nowrap">
                {product.compare_price ? `$${product.compare_price.toFixed(2)}` : "—"}
              </TableCell>

              <TableCell className="border-r border-violet-100 whitespace-nowrap">
                {product.in_stock ? (
                  product.stock_quantity
                ) : (
                  <span className="text-destructive">Out of stock</span>
                )}
              </TableCell>

              <TableCell className="border-r border-violet-100">
                <Badge
                  variant={product.status === "active" ? "default" : "secondary"}
                  className="capitalize"
                >
                  {product.status}
                </Badge>
              </TableCell>

              <TableCell className="border-r border-violet-100">
                {product.is_featured ? (
                  <Badge>Featured</Badge>
                ) : (
                  <span className="text-muted-foreground">—</span>
                )}
              </TableCell>

              <TableCell className="border-r border-violet-100 whitespace-nowrap">
                {new Date(product.created_at).toLocaleDateString()}
              </TableCell>

              <TableCell>
                <div className="flex items-center gap-1">
                  <ViewProductDialog
                    product={product}
                    trigger={
                      <Button variant="ghost" size="icon">
                        <Eye />
                      </Button>
                    }
                  />
                  <EditProductDialog
                    product={product}
                    categories={categories}
                    onUpdated={onProductChanged}
                    trigger={
                      <Button variant="ghost" size="icon">
                        <Pencil />
                      </Button>
                    }
                  />
                  <DeleteProductDialog
                    product={product}
                    onDeleted={onProductChanged}
                    trigger={
                      <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                        <Trash2 />
                      </Button>
                    }
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}