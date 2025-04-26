"use client"

import { useState } from "react"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface FamilyHistoriesFiltersProps {
  onSearch: (searchTerm: any) => void
  familyHistories: any
}

export default function FamilyHistoriesFilters({onSearch, familyHistories}: FamilyHistoriesFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilters, setActiveFilters] = useState<{
    search?: string
    family?: string
    statuses?: string[]
    dateRange?: { from?: string; to?: string }
  }>({})

  // Filter family history based on search term and status
  const filteredFamilies = familyHistories.filter((familyHistory: any) => {
    const matchesSearch =
      familyHistory.family.toLowerCase().includes(searchTerm.toLowerCase()) ||
      familyHistory.title.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch 
  })

  const handleSearch = () => {
    const newFilters = {
      ...activeFilters,
      search: searchTerm,
    }
    setActiveFilters(newFilters)
    onSearch(filteredFamilies)
  }

  const clearFilters = () => {
    setSearchTerm("")
    setActiveFilters({})
    onSearch(familyHistories)
  }

  const removeFilter = (type: string, value?: string) => {
    const newFilters = { ...activeFilters }

    if (type === "search") {
      setSearchTerm("")
      delete newFilters.search
    }

    setActiveFilters(newFilters)
    onSearch(familyHistories)
  }

  return (
    <div className="space-y-4 w-full">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search family histories..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>
      </div>

      {/* Active filters display */}
      {(activeFilters.search ||
        activeFilters.family ||
        (activeFilters.statuses && activeFilters.statuses.length > 0) ||
        activeFilters.dateRange) && (
        <div className="flex flex-wrap gap-2 pt-2">
          <div className="text-sm text-muted-foreground py-1">Active filters:</div>

          {activeFilters.search && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <span>Search: {activeFilters.search}</span>
              <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilter("search")} />
            </Badge>
          )}

          {activeFilters.family && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <span>Family: {activeFilters.family}</span>
              <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilter("family")} />
            </Badge>
          )}

          {activeFilters.statuses?.map((status) => (
            <Badge key={status} variant="secondary" className="flex items-center gap-1">
              <span>Status: {status}</span>
              <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilter("status", status)} />
            </Badge>
          ))}

          {activeFilters.dateRange && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <span>
                Date:
                {activeFilters.dateRange.from && ` From: ${activeFilters.dateRange.from}`}
                {activeFilters.dateRange.from && activeFilters.dateRange.to && ` -`}
                {activeFilters.dateRange.to && ` To: ${activeFilters.dateRange.to}`}
              </span>
              <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilter("dateRange")} />
            </Badge>
          )}

          {(activeFilters.search ||
            activeFilters.family ||
            (activeFilters.statuses && activeFilters.statuses.length > 0) ||
            activeFilters.dateRange) && (
            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" onClick={clearFilters}>
              Clear all
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
