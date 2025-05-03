"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import NewsFilters from "@/components/news/news-filters"
import NewsTable from "@/components/news/news-table"

export default function NewsClientPage() {
  const router = useRouter()

  // Initialize filters with default values that will show all news items
  const [filters, setFilters] = useState({
    categories: [] as string[],
    searchQuery: "",
    dateRange: {
      from: undefined as Date | undefined,
      to: undefined as Date | undefined,
    },
    status: "All",
  })

  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">News Management</h1>
        <Button onClick={() => router.push("/dashboard/events/news/create")}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create News
        </Button>
      </div>

      <NewsFilters onFiltersChange={handleFiltersChange} />
      <NewsTable
        selectedCategories={filters.categories}
        searchQuery={filters.searchQuery}
        dateRange={filters.dateRange}
        status={filters.status}
      />
    </div>
  )
}
