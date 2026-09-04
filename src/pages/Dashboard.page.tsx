import { useState } from "react"
import { Button } from "@/components/ui/button"
//import { getCategories } from "@/services/categories.service"
import { getProfile } from "@/services/updateProfile.service"

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGetCategories = async () => {
    setIsLoading(true)
    setError(null)

    // try {
    //   const response = await getCategories()
    //   console.log(response) 
    // } catch (err) {
    //   console.error("Failed to fetch categories:", err)
    //   setError("Failed to load categories. Please try again.")
    // } finally {
    //   setIsLoading(false)
    // }
        try {
          const response = await getProfile()
          console.log(response) 
        } catch (err) {
          console.error("Failed to get profile:", err)
          setError("Failed to load profile. Please try again.")
        } finally {
          setIsLoading(false)
      }
  }

  return (
    <div className="p-6">
      <Button variant="outline" onClick={handleGetCategories} disabled={isLoading}>
        {isLoading ? "Loading..." : "Get Categories"}
      </Button>

      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  )
}