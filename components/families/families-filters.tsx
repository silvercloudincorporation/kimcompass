"use client"

import type React from "react"

import { useState } from "react"
import { Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

export function FamiliesFilters() {
  const [searchTerm, setSearchTerm] = useState("")
  const [familyType, setFamilyType] = useState("")
  const [status, setStatus] = useState("")
  const [region, setRegion] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Searching for:", searchTerm)
    // Implement search functionality
  }

  const handleReset = () => {
    setSearchTerm("")
    setFamilyType("")
    setStatus("")
    setRegion("")
  }

  return (
    <Card>
      <form onSubmit={handleSearch}>
        <CardContent className="p-4 sm:p-6">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search families by name, ID, or head of family..."
              className="w-full pl-8 bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter className="p-4 sm:p-6 border-t flex flex-col sm:flex-row gap-4 bg-slate-50">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
            <Select value={familyType} onValueChange={setFamilyType}>
              <SelectTrigger>
                <SelectValue placeholder="Family Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nuclear">Nuclear Family</SelectItem>
                <SelectItem value="extended">Extended Family</SelectItem>
                <SelectItem value="single-parent">Single Parent</SelectItem>
                <SelectItem value="blended">Blended Family</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>

            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="pending">Pending Verification</SelectItem>
              </SelectContent>
            </Select>

            <Select value={region} onValueChange={setRegion}>
              <SelectTrigger>
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="north">North Region</SelectItem>
                <SelectItem value="south">South Region</SelectItem>
                <SelectItem value="east">East Region</SelectItem>
                <SelectItem value="west">West Region</SelectItem>
                <SelectItem value="central">Central Region</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 ml-auto">
            <Button type="button" variant="outline" onClick={handleReset} className="whitespace-nowrap">
              Reset
            </Button>
            <Button type="submit" className="bg-[#0A1931] hover:bg-[#0A1931]/90 whitespace-nowrap">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </CardFooter>
      </form>
    </Card>
  )
}
