export interface Category {
  id: number
  name: string
  slug: string
}

export interface Product {
  id: number
  category_id: number
  category: Category
  name: string
  slug: string
  sku: string
  description: string
  price: number
  compare_price: number | null
  stock_quantity: number
  in_stock: boolean
  thumbnail: string
  thumbnail_url: string
  images: string[]
  images_urls: string[]
  status: "active" | "inactive" | "draft"
  is_featured: boolean
  created_at: string
}