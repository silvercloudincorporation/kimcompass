"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"
import { families } from "@/components/people/mock-data"

interface PeopleFiltersProps {
  filters: {
    name: string
    status: string
    family: string
    gender: string
    lifeStatus: string
  }
  onFilterChange: (filters: any) => void
}

export function PeopleFilters({ filters, onFilterChange }: PeopleFiltersProps) {
  const [localFilters, setLocalFilters] = useState(filters)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setLocalFilters({ ...localFilters, [name]: value })
  }

  const handleSelectChange = (name: string, value: string) => {
    setLocalFilters({ ...localFilters, [name]: value })
  }

  const applyFilters = () => {
    onFilterChange(localFilters)
  }

  const clearFilters = () => {
    const emptyFilters = {
      name: "",
      status: "",
      family: "",
      gender: "",
      lifeStatus: "",
    }
    setLocalFilters(emptyFilters)
    onFilterChange(emptyFilters)
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="name"
              name="name"
              placeholder="Search by name..."
              className="pl-8"
              value={localFilters.name}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select value={localFilters.status} onValueChange={(value) => handleSelectChange("status", value)}>
            <SelectTrigger id="status">
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="family">Family</Label>
          <Select value={localFilters.family} onValueChange={(value) => handleSelectChange("family", value)}>
            <SelectTrigger id="family">
              <SelectValue placeholder="All families" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All families</SelectItem>
              {families.map((family) => (
                <SelectItem key={family} value={family}>
                  {family}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender">Gender</Label>
          <Select value={localFilters.gender} onValueChange={(value) => handleSelectChange("gender", value)}>
            <SelectTrigger id="gender">
              <SelectValue placeholder="All genders" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All genders</SelectItem>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="lifeStatus">Life Status</Label>
          <Select value={localFilters.lifeStatus} onValueChange={(value) => handleSelectChange("lifeStatus", value)}>
            <SelectTrigger id="lifeStatus">
              <SelectValue placeholder="All life statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All life statuses</SelectItem>
              <SelectItem value="alive">Alive</SelectItem>
              <SelectItem value="deceased">Deceased</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-end space-x-2">
          <Button onClick={applyFilters} className="flex-1">
            Apply Filters
          </Button>
          <Button variant="outline" size="icon" onClick={clearFilters} title="Clear filters">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
