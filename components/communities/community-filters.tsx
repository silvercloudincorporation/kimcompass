"use client"

import { useState } from "react"
import { Search, X, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface CommunityFiltersProps {
  onFilterChange: (filters: any) => void
}

export function CommunityFilters({ onFilterChange }: CommunityFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [regionFilter, setRegionFilter] = useState<string[]>([])
  const [statusFilter, setStatusFilter] = useState<string[]>([])
  const [populationRange, setPopulationRange] = useState<{ min?: string; max?: string }>({})
  const [activeFilters, setActiveFilters] = useState<{
    search?: string
    regions?: string[]
    statuses?: string[]
    population?: { min?: string; max?: string }
  }>({})

  const regions = ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Uasin Gishu", "Kilifi", "Trans Nzoia"]

  const statuses = ["Active", "Inactive", "Pending"]

  const handleSearch = () => {
    const newFilters = {
      ...activeFilters,
      search: searchTerm,
    }
    setActiveFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleRegionChange = (region: string) => {
    const updatedRegions = regionFilter.includes(region)
      ? regionFilter.filter((r) => r !== region)
      : [...regionFilter, region]

    setRegionFilter(updatedRegions)
  }

  const handleStatusChange = (status: string) => {
    const updatedStatuses = statusFilter.includes(status)
      ? statusFilter.filter((s) => s !== status)
      : [...statusFilter, status]

    setStatusFilter(updatedStatuses)
  }

  const applyFilters = () => {
    const newFilters = {
      ...activeFilters,
      regions: regionFilter.length > 0 ? regionFilter : undefined,
      statuses: statusFilter.length > 0 ? statusFilter : undefined,
      population: populationRange.min || populationRange.max ? populationRange : undefined,
    }
    setActiveFilters(newFilters)
    onFilterChange(newFilters)
  }

  const clearFilters = () => {
    setSearchTerm("")
    setRegionFilter([])
    setStatusFilter([])
    setPopulationRange({})
    setActiveFilters({})
    onFilterChange({})
  }

  const removeFilter = (type: string, value?: string) => {
    const newFilters = { ...activeFilters }

    if (type === "search") {
      setSearchTerm("")
      delete newFilters.search
    } else if (type === "region" && value) {
      const updatedRegions = regionFilter.filter((r) => r !== value)
      setRegionFilter(updatedRegions)
      newFilters.regions = updatedRegions.length > 0 ? updatedRegions : undefined
    } else if (type === "status" && value) {
      const updatedStatuses = statusFilter.filter((s) => s !== value)
      setStatusFilter(updatedStatuses)
      newFilters.statuses = updatedStatuses.length > 0 ? updatedStatuses : undefined
    } else if (type === "population") {
      setPopulationRange({})
      delete newFilters.population
    }

    setActiveFilters(newFilters)
    onFilterChange(newFilters)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search communities..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex gap-2">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Region</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {regions.map((region) => (
                      <div key={region} className="flex items-center space-x-2">
                        <Checkbox
                          id={`region-${region}`}
                          checked={regionFilter.includes(region)}
                          onCheckedChange={() => handleRegionChange(region)}
                        />
                        <Label htmlFor={`region-${region}`}>{region}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Status</h4>
                  <div className="flex flex-wrap gap-2">
                    {statuses.map((status) => (
                      <div key={status} className="flex items-center space-x-2">
                        <Checkbox
                          id={`status-${status}`}
                          checked={statusFilter.includes(status)}
                          onCheckedChange={() => handleStatusChange(status)}
                        />
                        <Label htmlFor={`status-${status}`}>{status}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Population</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="min-population">Min</Label>
                      <Input
                        id="min-population"
                        type="number"
                        placeholder="Min"
                        value={populationRange.min || ""}
                        onChange={(e) => setPopulationRange({ ...populationRange, min: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="max-population">Max</Label>
                      <Input
                        id="max-population"
                        type="number"
                        placeholder="Max"
                        value={populationRange.max || ""}
                        onChange={(e) => setPopulationRange({ ...populationRange, max: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" size="sm" onClick={clearFilters}>
                    Clear
                  </Button>
                  <Button size="sm" onClick={applyFilters}>
                    Apply Filters
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Button variant="default" onClick={handleSearch}>
            Search
          </Button>
        </div>
      </div>

      {/* Active filters display */}
      {(activeFilters.search ||
        (activeFilters.regions && activeFilters.regions.length > 0) ||
        (activeFilters.statuses && activeFilters.statuses.length > 0) ||
        activeFilters.population) && (
        <div className="flex flex-wrap gap-2 pt-2">
          <div className="text-sm text-muted-foreground py-1">Active filters:</div>

          {activeFilters.search && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <span>Search: {activeFilters.search}</span>
              <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilter("search")} />
            </Badge>
          )}

          {activeFilters.regions?.map((region) => (
            <Badge key={region} variant="secondary" className="flex items-center gap-1">
              <span>Region: {region}</span>
              <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilter("region", region)} />
            </Badge>
          ))}

          {activeFilters.statuses?.map((status) => (
            <Badge key={status} variant="secondary" className="flex items-center gap-1">
              <span>Status: {status}</span>
              <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilter("status", status)} />
            </Badge>
          ))}

          {activeFilters.population && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <span>
                Population:
                {activeFilters.population.min && ` Min: ${activeFilters.population.min}`}
                {activeFilters.population.min && activeFilters.population.max && ` -`}
                {activeFilters.population.max && ` Max: ${activeFilters.population.max}`}
              </span>
              <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilter("population")} />
            </Badge>
          )}

          {(activeFilters.search ||
            (activeFilters.regions && activeFilters.regions.length > 0) ||
            (activeFilters.statuses && activeFilters.statuses.length > 0) ||
            activeFilters.population) && (
            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" onClick={clearFilters}>
              Clear all
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
