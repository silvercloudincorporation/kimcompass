"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { MultiSelect } from "@/components/ui/multi-select"
import { getAllCategories } from "./mock-news-data"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DateRange } from "react-day-picker"

interface NewsFiltersProps {
  onFiltersChange: (filters: {
    categories: string[]
    searchQuery: string
    dateRange: { from: Date | undefined; to: Date | undefined }
    status: string
  }) => void
}

export default function NewsFilters({ onFiltersChange }: NewsFiltersProps) {
  // Get all unique categories from mock data
  const allCategories = getAllCategories()

  // Initialize state with default values
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: undefined,
    to: undefined,
  })
  const [status, setStatus] = useState("All")

  // Apply filters when any filter changes
  const applyFilters = () => {
    onFiltersChange({
      categories: selectedCategories,
      searchQuery,
      dateRange,
      status,
    })
  }

  // Handle category selection
  const handleCategoryChange = (values: string[]) => {
    setSelectedCategories(values)
    setTimeout(applyFilters, 0)
  }

  // Handle search query change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setTimeout(applyFilters, 300)
  }

  // Handle date range change
  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range || { from: undefined, to: undefined } as any)
    setTimeout(applyFilters, 0)
  }

  // Handle status change
  const handleStatusChange = (value: string) => {
    setStatus(value)
    setTimeout(applyFilters, 0)
  }

  // Clear all filters
  const clearFilters = () => {
    setSelectedCategories([])
    setSearchQuery("")
    setDateRange({ from: undefined, to: undefined })
    setStatus("All")

    // Apply the cleared filters
    setTimeout(() => {
      onFiltersChange({
        categories: [],
        searchQuery: "",
        dateRange: { from: undefined, to: undefined },
        status: "All",
      })
    }, 0)
  }

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search news..." className="pl-8" value={searchQuery} onChange={handleSearchChange} />
          </div>

          {/* Categories */}
          <div className="w-full md:w-64">
            <MultiSelect
              placeholder="Select categories"
              selected={selectedCategories}
              options={allCategories.map((category) => ({
                label: category,
                value: category,
              }))}
              onChange={handleCategoryChange}
            />
          </div>

          {/* Date Range */}
          <div className="w-full md:w-auto">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full md:w-auto justify-start text-left font-normal">
                  {dateRange.from ? (
                    dateRange.to ? (
                      <>
                        {dateRange.from.toLocaleDateString()} - {dateRange.to.toLocaleDateString()}
                      </>
                    ) : (
                      dateRange.from.toLocaleDateString()
                    )
                  ) : (
                    "Select date range"
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="range"
                  selected={{
                    from: dateRange.from,
                    to: dateRange.to,
                  }}
                  onSelect={handleDateRangeChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Status */}
          <div className="w-full md:w-40">
            <Select value={status} onValueChange={handleStatusChange}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Statuses</SelectItem>
                <SelectItem value="Published">Published</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Scheduled">Scheduled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Clear Filters */}
          <Button variant="outline" onClick={clearFilters} className="md:ml-auto">
            Clear Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
