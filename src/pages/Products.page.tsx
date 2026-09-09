import { useCallback, useEffect, useState } from "react"
import ProductTable from "@/components/Layout/ProductTable.component"
import { AddProductDialog } from "@/components/Layout/AddProductModal.component"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination"
import { getProducts } from "@/services/products.service"
import { getCategories } from "@/services/categories.service"
import type { Product, Category } from "@/types/products.type"
import axios from "axios"

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async (signal?: AbortSignal) => {
    setIsLoading(true)
    setError(null)

    try {
      const [productsRes, categoriesRes] = await Promise.all([
        getProducts(undefined, signal),
        getCategories(signal),
      ])
      setProducts(productsRes.data)
      setCategories(categoriesRes.data)
      setIsLoading(false)
    } catch (err) {
      if (axios.isCancel(err)) {
        return
      }
      console.error("Failed to fetch data:", err)
      setError("Failed to load products. Please try again.")
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()

    fetchData(controller.signal)
    return () => controller.abort()
  }, [fetchData])

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Products</h1>
        <AddProductDialog categories={categories} onCreated={() => fetchData()} />
      </div>

      {isLoading && <p className="text-muted-foreground">Loading products...</p>}
      {error && <p className="text-destructive">{error}</p>}
      {!isLoading && !error && (
        <ProductTable products={products} categories={categories} onProductChanged={() => fetchData()} />
      )}

      <div className="mt-6">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}